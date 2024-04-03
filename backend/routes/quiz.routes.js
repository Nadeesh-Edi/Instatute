import express from 'express'
const  router = express.Router()
import { verifyToken, verifyTokenForStaff, verifyTokenForStudent } from '../middleware/authMiddleware.js'

import { createQuiz, deleteQuiz, getAllQuizes, getQuizByCreator } from '../controllers/quiz.controller.js'

router.post('/createQuiz', verifyTokenForStaff, createQuiz)
router.post('/deleteQuiz/:id', verifyTokenForStaff, deleteQuiz)
router.post('/getAll', verifyTokenForStudent, getAllQuizes)
router.post('/getByCreator', verifyTokenForStaff, getQuizByCreator)

export default router;