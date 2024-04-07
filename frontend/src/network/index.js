import axios from "axios";

const baseUrl = "http://localhost:8000/api";

export default function request(params) {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";

    axios({
      baseURL: baseUrl,
      url: params.url,
      data: params.data,
      method: params.method,
      headers: { Authorization: token },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.error);
      });
  });
}
