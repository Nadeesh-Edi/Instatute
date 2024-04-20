import express from 'express'
const  router = express.Router()
import { verifyToken, verifyTokenForStaff, verifyTokenForStudent } from '../middleware/authMiddleware.js'

import { createQuiz, deleteQuiz, getAllQuizes, getQuizByCreator, getQuizById, getAllNewUnattemptedQuizes } from '../controllers/quiz.controller.js'
import { submitQuiz, getResultsByQuizId, getAttemptedQuizes, getAttemptDetailsByQuizId } from '../controllers/quiz.results.controller.js'

router.post('/createQuiz', verifyTokenForStaff, createQuiz)
router.post('/deleteQuiz/:id', verifyTokenForStaff, deleteQuiz)
router.post('/getAll', verifyTokenForStudent, getAllQuizes)
router.post('/getByCreator', verifyTokenForStaff, getQuizByCreator)
router.post('/getById/:id', verifyTokenForStudent, getQuizById)

router.post('/submitQuiz', verifyTokenForStudent, submitQuiz)
router.post('/getByQuiz/:id', verifyTokenForStaff, getResultsByQuizId)
router.post('/getAttemptedQuizes', verifyTokenForStudent, getAttemptedQuizes)
router.post('/getNewUnattemptedQuizes', verifyTokenForStudent, getAllNewUnattemptedQuizes)
router.post('/getAttemptDetails/:id', verifyTokenForStudent, getAttemptDetailsByQuizId)

export default router;