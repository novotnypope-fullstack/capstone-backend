import express from "express";
const router = express.Router();
export default router;

import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "#db/queries/departments";

router.route("/").get(async (req, res) => {
  const departments = await getAllDepartments();
  res.json(departments);
});

router.route("/").post(async (req, res) => {
  const { name, description, contactEmail, contactPhone, bannerImageUrl } =
    req.body;

  if (!name) {
    return res.status(400).json({ error: "Department name is required" });
  }

  const department = await createDepartment(
    name,
    description,
    contactEmail,
    contactPhone,
    bannerImageUrl
  );
  res.status(201).json(department);
});

router.route("/:id").get(async (req, res) => {
  const department = await getDepartmentById(req.params.id);
  if (!department) {
    return res.status(404).json({ error: "Department not found" });
  }
  res.json(department);
});

router.route("/:id").put(async (req, res) => {
  const { name, description, contactEmail, contactPhone, bannerImageUrl } =
    req.body;
  const department = await updateDepartment(
    req.params.id,
    name,
    description,
    contactEmail,
    contactPhone,
    bannerImageUrl
  );
  if (!department) {
    return res.status(404).json({ error: "Department not found" });
  }
  res.json(department);
});

router.route("/:id").delete(async (req, res) => {
  const result = await deleteDepartment(req.params.id);
  if (!result) {
    return res.status(404).json({ error: "Department not found" });
  }
  res.json({ message: "Department deleted successfully" });
});
