import asyncHandler from "express-async-handler";

import Quizes from "../models/quiz.model.js";
import Users from "../models/user.model.js"

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
    res.status(501).json({ error: "Error" });
  }
});

// Get all quizes
const getAllQuizes = asyncHandler(async (req, res) => {
  try {
    const quizes = await Quizes.find({});
    const newQuizes = await Promise.all(
      quizes.map(async (quiz) => await getResponseModel(quiz))
    )
    res.status(200).json(newQuizes);
  } catch {
    res.status(501).json({ error: "Error" });
  }
});

// Get quiz by creator
const getQuizByCreator = asyncHandler(async (req, res) => {
  const id = req.user_id;

  // Id request validation
  if (!id) return res.status(404).json({ error: "Id not found" });

  try {
    const quizes = await Quizes.find({ createdBy: id });
    const newQuizes = await Promise.all(
      quizes.map(async (quiz) => await getResponseModel(quiz))
    )
    res.status(200).json(newQuizes);
  } catch {
    res.status(501).json({ error: "Error" });
  }
});

// Get quiz by Id
const getQuizById = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    // Id request validation
    if (!id) return res.status(404).json({ error: "Id not found" });
  
    try {
      const quizes = await Quizes.findById(id);
      const newQuiz = await getResponseModel(quizes)
      res.status(200).json(newQuiz);
    } catch (error) {
      res.status(501).send(error);
    }
  });

// Delete quiz
const deleteQuiz = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Id request validation
  if (!id) return res.status(404).json({ error: "Id not found" });

  try {
    const deleted = await Quizes.deleteOne({ _id: id });
    if (deleted.deletedCount) {
      res.status(200).send("Successfully deleted");
    } else {
      res.status(404).json({ error: "Quiz not found" });
    }
  } catch {
    res.status(501).json({ error: "Error" });
  }
});

const getResponseModel = async (quiz) => {
  let newQuiz = quiz;
  newQuiz.questions.forEach((item) => {
    delete item.correctAnswerIndex;
  });
  const createdBy = await Users.findById(newQuiz.createdBy);
  newQuiz.createdBy = createdBy.name;

  return newQuiz;
};

// TODO
// Edit quiz

export { createQuiz, deleteQuiz, getAllQuizes, getQuizByCreator, getQuizById };
