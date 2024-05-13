import asyncHandler from "express-async-handler";

import Webforums from "../models/webforums.model.js";
import Users from "../models/user.model.js";

// Create Webforum
const createForum = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const createdBy = req.user_id;

  try {
    const forum = new Webforums({
      title,
      content,
      createdBy,
      uiType: Math.floor(Math.random() * 4),
    });
    forum
      .save()
      .then((mRes) => {
        res.status(201).json(mRes);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (err) {
    res.status(501).json({ error: err });
  }
});

// Get all webforums
const getAll = asyncHandler(async (req, res) => {
  try {
    const forums = await Webforums.find({}).sort({ createdAt: -1 });
    const responsForums = await Promise.all(
      forums.map(async (forum) => await getResponseObj(forum))
    );
    res.status(200).json(responsForums);
  } catch {
    res.status(501).json({ error: "Error" });
  }
});

// Get all webforums
const getByCreator = asyncHandler(async (req, res) => {
  const createdBy = req.user_id;

  try {
    const forums = await Webforums.find({ createdBy: createdBy }).sort({
      createdAt: -1,
    });
    const responsForums = await Promise.all(
      forums.map(async (forum) => await getResponseObj(forum))
    );
    res.status(200).json(responsForums);
  } catch {
    res.status(501).json({ error: "Error" });
  }
});

const editForum = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const id = req.params.id;
  const createdBy = req.user_id;

  try {
    const forum = await Webforums.findById(id);

    // Null and Ownership validation
    if (!forum) return res.status(404).json({ error: "Webforum not found" });
    if (forum.createdBy != createdBy)
      return res.status(401).json({ error: "Unauthorized" });

    const updated = await Webforums.findByIdAndUpdate(id, { title, content });
    res.status(200).send("Successfully updated");
  } catch (err) {
    res.status(501).json({ error: err });
  }
});

const deleteForum = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const createdBy = req.user_id;

  try {
    const forum = await Webforums.findById(id);

    // Null and Ownership validation
    if (!forum) return res.status(404).json({ error: "Webforum not found" });
    if (forum.createdBy != createdBy)
      return res.status(401).json({ error: "Unauthorized" });

    const deleted = await Webforums.findByIdAndDelete(id);
    res.status(200).send("Successfully Deleted");
  } catch (err) {
    res.status(501).json({ error: err });
  }
});

const getForumById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const forum = await Webforums.findById(id);
    if (!forum) return res.status(404).json({ error: "Webforum not found" });

    const returnForum = await getResponseObj(forum)

    return res.status(200).json(returnForum);
  } catch (err) {
    res.status(501).json({ error: err });
  }
});

// Get the response object
const getResponseObj = async (forum) => {
  let newForum = forum.toObject();
  const createdBy = await Users.findById(newForum.createdBy);
  newForum.createdBy = createdBy.toObject();

  return newForum;
};

export {
  createForum,
  getAll,
  getByCreator,
  editForum,
  deleteForum,
  getForumById,
};
