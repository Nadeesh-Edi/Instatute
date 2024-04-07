import { configureStore } from "@reduxjs/toolkit";
import selectedQuizReducer from "./selectedQuiz/selectedQuizSlice";

export const store = configureStore({
  reducer: {
    selectedQuiz: selectedQuizReducer,
  },
});
