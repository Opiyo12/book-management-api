import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import database from "../config/database.js";

//Authorization: Bearer <access_token>
// function for protecting routes by checking request headers for a valid access token
export const protect = (req, res, next) => {
  try {
    //get authorization header
    const authHeader = req.headers.authorization;
    //check if authorization header is present and starts with Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Not authorized. Missing token.", 401);
    }
    //get token from authorization header
    const token = authHeader.split(" ")[1];
    //verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //check if token is an access token
    if (payload?.tokenUse !== "access") {
      throw new AppError("Not authorized. Invalid token type.", 401);
    }

    req.user = {
      id: payload.sub,
      email: payload.email,
    };

    next();
  } catch (err) {
    next(err instanceof AppError ? err : new AppError("Invalid or expired token.", 401));
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

// Middleware to check if user is admin (root-user)
export const protectAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      throw new AppError("Not authorized. No user found.", 401);
    }

    const [rows] = await database.execute(
      "SELECT id, role FROM users WHERE id = ? LIMIT 1",
      [req.user.id]
    );

    if (rows.length === 0) {
      throw new AppError("User not found.", 404);
    }

    const user = rows[0];
    if (user.role !== "admin") {
      throw new AppError("Access denied. Admin privileges required.", 403);
    }

    next();
  } catch (err) {
    next(err instanceof AppError ? err : new AppError("Authorization failed.", 401));
  }
};


