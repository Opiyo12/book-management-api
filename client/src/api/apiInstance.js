import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearUser,
} from '../utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const apiInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

apiInstance.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const refreshTokenRequest = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await axios.post(
    `${API_BASE_URL}/api/auth/refresh`,
    { refreshToken },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  setTokens({ token: response.data.token, refreshToken: response.data.refreshToken });
  return response.data.token;
};
//automatically refresh access token on 401 response and retry original request
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // Avoid retrying the refresh request itself
      if (originalRequest.url?.includes('/auth/refresh')) {
        clearUser();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshTokenRequest();
        onRefreshed(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiInstance(originalRequest);
      } catch (refreshError) {
        clearUser();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
