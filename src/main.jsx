import { getRuntimeConfig } from './config';

getRuntimeConfig().then((config) => {
  window.API_BASE = config.VITE_API_BASE;

  import('./bootstrap').then(({ mountApp }) => {
    mountApp();
  });
});
