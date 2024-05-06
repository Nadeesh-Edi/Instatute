import asyncHandler from "express-async-handler";

import QuizeResults from "../models/quiz.results.model.js";
import Quizes from "../models/quiz.model.js";
import Users from "../models/user.model.js";

// Submit answers for a quiz
const submitQuiz = asyncHandler(async (req, res) => {
  const { quizId, answers } = req.body;
  const studentId = req.user_id;

  if (!quizId || !answers) return res.status(400).json({ error: "Not found" });

  // Check if the quiz is already attempted
  try {
    const currentResult = await QuizeResults.findOne({
      studentId: studentId,
      quizId: quizId,
    });
    if (currentResult) return res.status(400).json({ error: "Already attempted" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }

  let score = 0;

  try {
    const quiz = await Quizes.findById(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

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
        res.status(500).json({ error: err });
      });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get results by Quiz id
const getResultsByQuizId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Id request validation
  if (!id) return res.status(404).json({ error: "Id not found" });

  try {
    const results = await QuizeResults.find({ quizId: id });
    const newResults = await Promise.all(
      results.map(async (item) => {
        const newItem = item.toObject();
        const student = await Users.findById(newItem.studentId);
        newItem.student = student.name;

        const quiz = await Quizes.findById(newItem.quizId)
        newItem.quiz = { title: quiz.title, description: quiz.description }
        delete newItem.studentId;
        delete newItem._id

        return newItem;
      })
    );
    res.status(200).json(newResults);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get the attempted quizes list
const getAttemptedQuizes = asyncHandler(async (req, res) => {
  const id = req.user_id;

  try {
    const results = await QuizeResults.find({ studentId: id }).sort({ createdAt: -1 });
    const newResults = await Promise.all(results.map(async (item) => {
        const newItem = item.toObject();
        const quiz = await Quizes.findById(newItem.quizId)
        newItem.quiz = {
          title: quiz.title,
          description: quiz.description,
          id: newItem.quizId
        }

        delete newItem.quizId;
        delete newItem.studentId
        delete newItem._id

        return newItem
    }))
    res.status(200).json(newResults)
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Get attempt details
const getAttemptDetailsByQuizId = asyncHandler(async (req, res) => {
  const id = req.user_id;
  const quizId = req.params.id;

  if (!quizId) return res.status(404).json({ error: "Quiz not found" });

  try {
    const result = await QuizeResults.findOne({ quizId: quizId, studentId: id })

    if (!result) return res.status(404).json({ error: "Not attempted" });
    
    const quiz = await Quizes.findById(quizId)
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    const newItem = result.toObject();
    newItem.quiz = { title: quiz.title, description: quiz.description }
    delete newItem.quizId;
    delete newItem.studentId
    delete newItem._id

    res.status(200).json(newItem)
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

export { submitQuiz, getResultsByQuizId, getAttemptedQuizes, getAttemptDetailsByQuizId };
