import request from "network";

// Login
const login = (params) => {
  return request({ url: "/user/login", method: "post", data: params });
};

// Create Quiz
const createQuiz = (params) => {
  return request({ url: "/quiz/createQuiz", method: "post", data: params });
};

// Get new quizes
const getNewQuizes = (params) => {
  return request({ url: "/quiz/getAll", method: "post", data: params });
};

// Get new quizes
const getAttemptedQuizes = (params) => {
  return request({ url: "/quiz/getAttemptedQuizes", method: "post", data: params });
};

export { login, createQuiz, getNewQuizes, getAttemptedQuizes };
