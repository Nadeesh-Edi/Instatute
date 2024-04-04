import asyncHandler from "express-async-handler";

import QuizeResults from "../models/quiz.results.model.js";
import Quizes from "../models/quiz.model.js";
import Users from "../models/user.model.js";

// Submit answers for a quiz
const submitQuiz = asyncHandler(async (req, res) => {
  const { quizId, answers } = req.body;
  const studentId = req.user_id;

  if (!quizId || !answers) return res.status(400).send("Not found");

  // Check if the quiz is already attempted
  try {
    const currentResult = await QuizeResults.findOne({
      studentId: studentId,
      quizId: quizId,
    });
    if (currentResult) return res.status(400).send("Already attempted");
  } catch (err) {
    return res.status(500).json(err);
  }

  let score = 0;

  try {
    const quiz = await Quizes.findById(quizId);
    if (!quiz) return res.status(404).send("Quiz not found");

    const quizQuestions = quiz.questions;
    for (let i = 0; i < quizQuestions.length; i++) {
      if (quizQuestions[i].correctAnswerIndex == answers[i]) {
        score++;
      }
    }
    // Calculate score as a percentage
    const finalScore = (score / quizQuestions.length) * 100;

    // Save the results in db
    const quizResult = new QuizeResults({
      quizId,
      studentId,
      answers,
      score: finalScore,
    });
    quizResult
      .save()
      .then((mRes) => {
        res.status(201).json({ score: finalScore });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

const getResultsByQuizId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Id request validation
  if (!id) return res.status(404).send("Id not found");

  try {
    const results = await QuizeResults.find({ quizId: id });
    const newResults = await Promise.all(
      results.map(async (item) => {
        const newItem = item.toObject();
        const student = await Users.findById(newItem.studentId);
        newItem.student = student.name;
        delete newItem.studentId;
        delete newItem._id

        return newItem;
      })
    );
    res.status(200).json(newResults);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getAttemptedQuizes = asyncHandler(async (req, res) => {
  const id = req.user_id;

  try {
    const results = await QuizeResults.find({ studentId: id })
    const newResults = await Promise.all(results.map(async (item) => {
        const newItem = item.toObject();
        const quiz = await Quizes.findById(newItem.quizId)
        newItem.quiz = quiz.title;

        delete newItem.quizId;
        delete newItem.studentId
        delete newItem._id

        return newItem
    }))
    res.status(200).json(newResults)
  } catch (err) {
    res.status(500).send(err);
  }
});

export { submitQuiz, getResultsByQuizId, getAttemptedQuizes };
