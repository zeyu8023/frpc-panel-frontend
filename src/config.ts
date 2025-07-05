export const getRuntimeConfig = async () => {
  const res = await fetch('/config.json');
  return await res.json();
};
