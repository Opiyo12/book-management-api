const USER_KEY = "user";

// Save user
export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Get user
export function getUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

// Remove user (logout)
export function clearUser() {
  localStorage.removeItem(USER_KEY);
}