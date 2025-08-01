import axios, { AxiosRequestConfig, Method } from 'axios';
import { store } from '@/redux/store';
// import { getClientInfo } from './utils';

// Base URL for your API
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get current auth token
export const getAuthToken = () => {
  return store.getState().user.token || null;
};

// Function to get client info from Redux store
export const getClientInfo = () => {
  const state = store.getState();
  const info = state.info || {};

  // Create a client info object with all the required fields
  return info;
  // return {
  //   latitude: info.latitude || '',
  //   longitude: info.longitude || '',
  //   browser: info.browser || '',
  //   device: info.device || '',
  //   ip: info.ip || '',

  // };
};

// Main API call function
export const apiCall = async <T = any>(
  method: Method,
  endpoint: string,
  payload: any = null,
  additionalConfig: AxiosRequestConfig = {},
): Promise<T> => {
  try {
    // Get current token and client info
    const token = getAuthToken();
    const clientInfo = getClientInfo();
    const headers: any = {
      ...additionalConfig.headers,
      clientInfo: JSON.stringify(clientInfo),
    };

    if (
      !endpoint.includes('verifyOTP') ||
      !endpoint.includes('resendOTP') ||
      !endpoint.includes('login') ||
      !endpoint.includes('register') ||
      !endpoint.includes('forget-password')
    ) {
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }
    // Prepare request config
    const config: AxiosRequestConfig = {
      method,
      url: endpoint,
      ...additionalConfig,
      headers: headers,
    };

    // Add data payload for appropriate methods
    if (
      payload !== null &&
      ['post', 'put', 'patch'].includes(method.toLowerCase())
    ) {
      config.data = payload;
    }

    if (payload !== null && method.toLowerCase() === 'get') {
      config.params = payload;
    }
    try {
      const response = await axiosInstance(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

// Convenience methods
export const get = <T = any>(endpoint: string, params = null, config = {}) =>
  apiCall<T>('get', endpoint, params, config);

export const post = <T = any>(endpoint: string, data = {}, config = {}) =>
  apiCall<T>('post', endpoint, data, config);

export const put = <T = any>(endpoint: string, data = null, config = {}) =>
  apiCall<T>('put', endpoint, data, config);

export const patch = <T = any>(endpoint: string, data = null, config = {}) =>
  apiCall<T>('patch', endpoint, data, config);

export const del = <T = any>(endpoint: string, config = {}) =>
  apiCall<T>('delete', endpoint, null, config);

export default axiosInstance;
