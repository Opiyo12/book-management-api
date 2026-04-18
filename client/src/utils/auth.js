const USER_KEY = "user";
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// Save user
export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function setTokens({ token, refreshToken }) {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

// Get user
export function getUser() {
  const user = localStorage.getItem(USER_KEY);
  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    clearUser();
    return null;
  }
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function hasValidAuthState() {
  const user = getUser();
  const token = getAccessToken();
  return Boolean(user && token);
}

// Remove user (logout)
export function clearUser() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}