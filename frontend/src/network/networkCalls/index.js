import request from "network";

// Login
const login = (params) => {
  return request({ url: "/user/login", method: "post", data: params });
};

// Create Quiz
const createQuiz = (params) => {
  return request({ url: "/quiz/createQuiz", method: "post", data: params });
};

export { login, createQuiz };
