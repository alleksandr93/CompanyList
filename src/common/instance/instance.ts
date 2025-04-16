import axios from "axios"

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
  },
})
// он нужен пробы прикреплять токен из локал стородж в каждом запросе
instance.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("authToken")}`
  return config
})
