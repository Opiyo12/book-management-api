import {
  registerUser,
  loginUser,
  getUserById,
  refreshAccessToken,
  logoutUser,
} from "../services/auth.service.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await registerUser({ name, email, password, role });
    res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    res.status(200).json({
      message: "Login successful",
      token: result.token,
      refreshToken: result.refreshToken,
      data: result.user,
    });
  } catch (error) {
    next(error);
  }
};

// This endpoint is used when an access token has expired.
// The frontend sends the refresh token, and the backend issues a new access token.
export const refreshController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await refreshAccessToken({ refreshToken });
    res.status(200).json({
      message: "Token refreshed successfully",
      token: result.token,
      refreshToken: result.refreshToken,
      data: result.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    await logoutUser(req.user.id);
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const meController = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

