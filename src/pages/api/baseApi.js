import axios from "axios";

export const BASE_API = axios.create({
  responseType: "json",
  withCredentials: true,
});

BASE_API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    axios
      .get("/api/v1/token/valid", {
        withCredentials: true,
        headers: {
          authorization: accessToken,
        },
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.headers.authorization);
        config.headers.Authorization = accessToken;
      })
      .catch((err) => {
        localStorage.removeItem("accessToken");
        axios
          .get("/api/v1/token/update", {
            withCredentials: true,
          })
          .then((res) => {
            localStorage.setItem("accessToken", res.headers.authorization);
            config.headers.Authorization = accessToken;
            return config;
          })
          .catch((err) => {
            localStorage.removeItem("accessToken");
            alert("로그인이 만료되었습니다.");
            window.location.href("/");
          });
      });
  }
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

    await axios
      .get("/api/v1/token/update", {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.headers.authorization);
        return axios(config);
      })
      .catch((err) => {
        localStorage.removeItem("accessToken");
        alert("로그인이 만료되었습니다");
        window.location.href = "/";
      });
  },
);
