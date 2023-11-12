import axios from "axios";

export const BASE_API = axios.create({
  responseType: "json",
  withCredentials: true,
});

BASE_API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = accessToken;
  }

  return config;
});

BASE_API.interceptors.response.use(
  (res) => res,
  async (err) => {
    const {
      config,
      response: { status },
    } = err;
    const originalRequest = config;

    if (status !== 403) {
      return Promise.reject(err);
    }

    const {
      headers: { authorization },
    } = await axios.get("https://dev.deunku.com/api/v1/token/update", {
      withCredentials: true,
    });
    localStorage.setItem("accessToken", authorization);

    if (typeof authorization === "string") {
      config.headers.Authorization = authorization;
      return axios(config);
    }

    alert("로그인이 만료되었습니다");
    window.location.href = "/";
  },
);
