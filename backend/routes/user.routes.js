import express from 'express'
const  router = express.Router()

import { createNewUser, login, editUser, deleteUser } from '../controllers/user.controller.js'

router.post('/createUser', createNewUser)
router.post('/login', login)
router.post('/editUser', editUser)
router.post('/deleteUser/:id', deleteUser)

export default router;