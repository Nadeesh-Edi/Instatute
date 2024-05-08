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
  return request({ url: "/quiz/getNewUnattemptedQuizes", method: "post", data: params });
};

// Get new quizes
const getAttemptedQuizes = (params) => {
  return request({ url: "/quiz/getAttemptedQuizes", method: "post", data: params });
};

// Get new quizes
const getCreatedQuizes = (params) => {
  return request({ url: "/quiz/getByCreator", method: "post", data: params });
};

// Get quiz results by quizid
const getQuizAttempts = (params) => {
  return request({ url: `/quiz/getByQuiz/${params}`, method: "post", data: {} });
};

// Get quiz results by quizid
const getQuizInfoById = (params) => {
  return request({ url: `/quiz/getById/${params}`, method: "post", data: {} });
};

// Submit quiz
const submitQuiz = (params) => {
  return request({ url: `/quiz/submitQuiz`, method: "post", data: params });
};

// Get attempted quiz details
const getAttemptDetails = (params) => {
  return request({ url: `/quiz/getAttemptDetails/${params}`, method: "post", data: {} });
};

// Get Register
const register = (params) => {
  return request({ url: `/user/createUser`, method: "post", data: params });
};

// Create web forum
const createWebforum = (params) => {
  return request({ url: `/webforum/createForum`, method: "post", data: params });
};

// Get webforums by creator
const getMyWebforums = (params) => {
  return request({ url: `/webforum/getMyForums`, method: "get", data: {} });
};

// Delete webforum
const deleteWebforum = (params) => {
  return request({ url: `/webforum/deleteForum/${params}`, method: "post", data: {} });
};

export {
  login,
  createQuiz,
  getNewQuizes,
  getAttemptedQuizes,
  getCreatedQuizes,
  getQuizAttempts,
  getQuizInfoById,
  submitQuiz,
  getAttemptDetails,
  register,
  createWebforum,
  getMyWebforums,
  deleteWebforum,
};
