import axios from 'axios';

let api = null;

export const initApi = () => {
  if (!window.API_BASE) {
    throw new Error('API_BASE 未定义');
  }

  api = axios.create({
    baseURL: window.API_BASE,
    timeout: 10000,
  });
};

export const getApi = () => {
  if (!api) throw new Error('API 尚未初始化');
  return api;
};
