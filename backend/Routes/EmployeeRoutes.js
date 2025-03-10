const express = require("express");
const routes = express.Router();
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployee,
} = require("../Controllers/EmpolyeeController"); //all funtions importing

const { cloudinaryFileUploader } = require("../Middlewares/FileUploader");

// Get all employees
routes.get("/", getAllEmployees);

// Get employee by ID
routes.get("/:id", getEmployeeById);

// Delete employee by ID
routes.delete("/:id", deleteEmployeeById);

// Create employee (POST) - Ensure request is sent to `/api/employees/`
routes.post("/", cloudinaryFileUploader.single("profileImage"), createEmployee);

// Update employee (PUT) - Ensure request is sent to `/api/employees/:id`
routes.put(
  "/:id",
  cloudinaryFileUploader.single("profileImage"),
  updateEmployee
);

module.exports = routes;
