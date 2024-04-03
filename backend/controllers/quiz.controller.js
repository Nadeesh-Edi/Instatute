import asyncHandler from "express-async-handler";
import QuizQuestion from "../models/quiz.question.model.js";

import Quizes from "../models/quiz.model.js";

// Create Quiz
const createQuiz = asyncHandler(async (req, res) => {
  const { title, questions, createdBy, timePeriod, deadline } = req.body;

  try {
    const quiz = new Quizes({
      title,
      questions,
      createdBy,
      timePeriod,
      deadline,
    });
    quiz
      .save()
      .then((mRes) => {
        res.status(201).json(mRes);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch {
    res.status(501).send("Error");
  }
});

// Get all quizes
const getAllQuizes = asyncHandler(async (req, res) => {
  try {
    const quizes = await Quizes.find({});
    res.status(200).json(quizes);
  } catch {
    res.status(501).send("Error");
  }
});

// Get quiz by creator
const getQuizByCreator = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Id request validation
  if (!id) return res.status(404).send("Id not found");

  try {
    const quizes = await Quizes.find({ createdBy: id });
    res.status(200).json(quizes);
  } catch {
    res.status(501).send("Error");
  }
});

// Delete quiz
const deleteQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Id request validation
  if (!id) return res.status(404).send("Id not found");

  try {
    const deleted = await Quizes.deleteOne({ _id: id });
    if (deleted.deletedCount) {
      res.status(200).send("Successfully deleted");
    } else {
      res.status(404).send("Quiz not found");
    }
  } catch {
    res.status(501).send("Error");
  }
});

// TODO
// Edit quiz

export { createQuiz, deleteQuiz, getAllQuizes, getQuizByCreator };
