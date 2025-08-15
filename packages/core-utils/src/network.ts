/**
 * 网络请求工具
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getPlatformInfo } from './platform';

// 创建axios实例
const api = axios.create({
  baseURL: process.env.API_ENDPOINT || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Platform': getPlatformInfo().name,
    'X-Platform-Version': getPlatformInfo().version
  }
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证token等
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 通用请求方法
 */
export const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * GET请求
 */
export const get = <T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>({
    method: 'GET',
    url,
    params,
    ...config
  });
};

/**
 * POST请求
 */
export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>({
    method: 'POST',
    url,
    data,
    ...config
  });
};

/**
 * PUT请求
 */
export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>({
    method: 'PUT',
    url,
    data,
    ...config
  });
};

/**
 * DELETE请求
 */
export const del = <T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
  return request<T>({
    method: 'DELETE',
    url,
    params,
    ...config
  });
};
