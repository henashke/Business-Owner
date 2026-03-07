import axios, { AxiosInstance } from "axios";

export const getApi = (path: string): AxiosInstance => {
  const apiPath = `${window.location.origin}/api${path}`
  return axios.create({
    baseURL: `${apiPath}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
};
