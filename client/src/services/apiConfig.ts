export const getApiBaseUrl = (path: string): string => {
  console.log(import.meta.env.PROD);
  
  const base = import.meta.env.PROD 
    ? `${window.location.origin}/api` 
    : 'http://localhost:8080/api';
  return `${base}${path}`;
};
