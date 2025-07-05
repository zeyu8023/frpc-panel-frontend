import axios from 'axios';

let api = null;

/**
 * 初始化 axios 实例，读取 window.API_BASE
 */
export const initApi = () => {
  if (!window.API_BASE) {
    throw new Error('API_BASE 未定义，请确保 config.json 已加载');
  }

  api = axios.create({
    baseURL: window.API_BASE,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 可选：添加响应拦截器
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      console.error('API 请求失败:', err);
      return Promise.reject(err);
    }
  );
};

/**
 * 获取 axios 实例
 */
export const getApi = () => {
  if (!api) {
    throw new Error('API 尚未初始化，请先调用 initApi()');
  }
  return api;
};
