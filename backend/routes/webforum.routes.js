import express from "express";
const router = express.Router();
import {
  verifyToken,
  verifyTokenForStaff,
  verifyTokenForStudent,
} from "../middleware/authMiddleware.js";

import { createForum, getAll, getByCreator, editForum, deleteForum, getForumById } from "../controllers/webforum.controller.js";

router.post("/createForum", verifyTokenForStaff, createForum);
router.get("/getForums", verifyTokenForStudent, getAll);
router.get("/getMyForums", verifyTokenForStaff, getByCreator);
router.post("/editForum/:id", verifyTokenForStaff, editForum);
router.post("/deleteForum/:id", verifyTokenForStaff, deleteForum);
router.get("/getById/:id", getForumById);

export default router;
