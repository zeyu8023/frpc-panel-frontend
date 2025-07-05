interface RuntimeConfig {
  VITE_API_BASE: string;
}

export const getRuntimeConfig = async (): Promise<RuntimeConfig> => {
  const response = await fetch('/config.json');
  return await response.json();
};
