import axios from "axios";
import { useRouter } from "vue-router";

export default defineNuxtPlugin(async () => {
  const router = useRouter();
  const runtimeConfig = useRuntimeConfig();
  const API_URL = `${runtimeConfig.public.baseURL}/api`;

  console.log("API_URL : ", API_URL);

  const request = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  request.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  request.interceptors.response.use(
    (response) => {
      console.log("Response Interceptor çalıştı ");
      return response;
    },
    (error) => {
      console.log(" hata :", error);
      if (error.status === 401) {
        alert("deneme")
      }
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      request,
    },
  };
});
