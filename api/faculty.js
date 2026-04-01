import express from "express";
const router = express.Router();
export default router;

import {
  getAllFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from "#db/queries/faculty";

router.route("/").get(async (req, res) => {
  const faculty = await getAllFaculty();
  res.json(faculty);
});

router.route("/").post(async (req, res) => {
  const { name, bio, email, profileImageUrl, departmentId } = req.body;

  if (!name || !email || !departmentId) {
    return res
      .status(400)
      .json({ error: "Name, email, and department ID are required" });
  }

  const member = await createFaculty(
    name,
    bio,
    email,
    profileImageUrl,
    departmentId
  );
  res.status(201).json(member);
});

router.route("/:id").get(async (req, res) => {
  const member = await getFacultyById(req.params.id);
  if (!member) {
    return res.status(404).json({ error: "Faculty member not found" });
  }
  res.json(member);
});

router.route("/:id").put(async (req, res) => {
  const { name, bio, email, profileImageUrl, departmentId } = req.body;
  const member = await updateFaculty(
    req.params.id,
    name,
    bio,
    email,
    profileImageUrl,
    departmentId
  );
  if (!member) {
    return res.status(404).json({ error: "Faculty member not found" });
  }
  res.json(member);
});

router.route("/:id").delete(async (req, res) => {
  const result = await deleteFaculty(req.params.id);
  if (!result) {
    return res.status(404).json({ error: "Faculty member not found" });
  }
  res.json({ message: "Faculty member deleted successfully" });
});
