import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import database from "../config/database.js";
import AppError from "../utils/AppError.js";

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

const signAccessToken = ({ id, email }) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AppError("JWT_SECRET is not configured.", 500);
  }

  const expiresIn = process.env.JWT_EXPIRES_IN || "1d";

  return jwt.sign(
    { sub: id, email, tokenUse: "access" },
    secret,
    { expiresIn }
  );
};

const signRefreshToken = ({ id, email }) => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  if (!refreshSecret) {
    throw new AppError("JWT_REFRESH_SECRET (or JWT_SECRET) is not configured.", 500);
  }

  const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

  return jwt.sign(
    { sub: id, email, tokenUse: "refresh" },
    refreshSecret,
    { expiresIn }
  );
};

//register services
export const registerUser = async ({ name, email, password, role = "user" }) => {
  if (!email || !password) {
    throw new AppError("Email and password are required.", 400);
  }
    //for cleaning the emaila and making it lowercase
  const normalizedEmail = String(email).trim().toLowerCase();

  if (password.length < 6) {
    throw new AppError("Password must be at least 6 characters.", 400);
  }
  //for checking if the email is already registered
  const [existingRows] = await database.execute(
    "SELECT id FROM users WHERE email = ? LIMIT 1",
    [normalizedEmail]
  );

  if (existingRows.length > 0) {
    throw new AppError("Email is already registered.", 409);
  }
  //for hashing the password
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // Ensure role is one of the allowed roles
  const allowedRoles = ["user", "librarian", "teacher", "admin"];
  const normalizedRole = allowedRoles.includes(role) ? role : "user";

  const [result] = await database.execute(
    //for inserting the user into the database
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name || null, normalizedEmail, passwordHash, normalizedRole]
  );

  return {
    id: result.insertId,
    name: name || null,
    email: normalizedEmail,
    role: normalizedRole,
  };
};
//user login
  export const loginUser = async ({ email, password }) => {
    if (!email || !password) {
      throw new AppError("Email and password are required.", 400);
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const [rows] = await database.execute(
      "SELECT id, name, email, password, role FROM users WHERE email = ? LIMIT 1",
      [normalizedEmail]
    );

    if (rows.length === 0) {
      throw new AppError("Invalid email or password.", 401);
    }

    const user = rows[0];

  const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password.", 401);
    }

    // Only allow admin to login
    if (user.role !== "admin") {
      throw new AppError("Access denied. Only admins can login.", 403);
    }

    // Sign access and refresh tokens
    const accessToken = signAccessToken({ id: user.id, email: user.email });
    const refreshToken = signRefreshToken({ id: user.id, email: user.email });

    // Store the latest refresh token in DB (rotation invalidates old tokens).
    await database.execute(
      "UPDATE users SET refresh_token = ? WHERE id = ?",
      [refreshToken, user.id]
    );

    return {
      token: accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name || null,
        email: user.email,
        role: user.role || "user",
      },
    };
};

export const getUserById = async (id) => {
  const [rows] = await database.execute(
    "SELECT id, name, email, role FROM users WHERE id = ? LIMIT 1",
    [id]
  );

  if (rows.length === 0) {
    throw new AppError("User not found.", 404);
  }

  return rows[0];
};
// Function to refresh access token using a refresh token
export const refreshAccessToken = async ({ refreshToken }) => {
  // 1️⃣ Check that a refresh token was actually provided
  if (!refreshToken) {
    throw new AppError("Refresh token is required.", 400);
  }

  // 2️⃣ Pick the secret used to sign refresh tokens
  //    (can be a separate secret or fallback to main JWT_SECRET)
  const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  if (!refreshSecret) {
    throw new AppError("JWT_REFRESH_SECRET (or JWT_SECRET) is not configured.", 500);
  }

  // 3️⃣ Verify the refresh token
  //    - Checks signature and expiry
  //    - Throws if token is tampered or expired
  let payload;
  try {
    payload = jwt.verify(refreshToken, refreshSecret);
  } catch {
    throw new AppError("Invalid or expired refresh token.", 401);
  }

  // 4️⃣ Ensure this is actually a refresh token
  if (payload?.tokenUse !== "refresh") {
    throw new AppError("Invalid refresh token type.", 401);
  }

  const userId = payload.sub;

  // 5️⃣ Fetch user from database
  //    - Also fetches stored refresh token for comparison
  const [rows] = await database.execute(
    "SELECT id, name, email, role, refresh_token FROM users WHERE id = ? LIMIT 1",
    [userId]
  );

  if (rows.length === 0) {
    throw new AppError("User not found.", 404);
  }

  const user = rows[0];

  // 6️⃣ Enforce refresh token rotation
  //    - The refresh token provided must match the one stored in the database
  //    - Prevents reuse of old/stolen refresh tokens
  if (!user.refresh_token || user.refresh_token !== refreshToken) {
    throw new AppError("Refresh token has been revoked.", 401);
  }

  // 7️⃣ Issue a new access token
  //    - Short-lived, used for API requests
  const newAccessToken = signAccessToken({ id: user.id, email: user.email });

  // 8️⃣ Issue a new refresh token
  //    - Replaces the old refresh token (rotation)
  const newRefreshToken = signRefreshToken({ id: user.id, email: user.email });

  // 9️⃣ Update the refresh token in the database
  //    - Ensures old refresh token is no longer valid
  await database.execute(
    "UPDATE users SET refresh_token = ? WHERE id = ?",
    [newRefreshToken, user.id]
  );

  // 🔟 Return the new tokens and basic user info to the frontend
  return {
    token: newAccessToken,       // New access token for API requests
    refreshToken: newRefreshToken, // New refresh token for future refresh
    user: {
      id: user.id,
      name: user.name || null,
      email: user.email,
      role: user.role || "user",
    },
  };
};

export const logoutUser = async (id) => {
  await database.execute(
    "UPDATE users SET refresh_token = NULL WHERE id = ?",
    [id]
  );

  return { message: "Logged out successfully" };
};

