import express from 'express'
const  router = express.Router()

import { createQuiz, deleteQuiz, getAllQuizes, getQuizByCreator } from '../controllers/quiz.controller.js'

router.post('/createQuiz', createQuiz)
router.post('/deleteQuiz/:id', deleteQuiz)
router.post('/getAll', getAllQuizes)
router.post('/getByCreator/:id', getQuizByCreator)

export default router;