import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const selectedQuizSlice = createSlice({
  name: "selectedQuiz",
  initialState,
  reducers: {
    setSelectedQuiz: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedQuiz } = selectedQuizSlice.actions;
export default selectedQuizSlice.reducer;
