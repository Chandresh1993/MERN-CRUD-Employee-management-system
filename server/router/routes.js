const express = require("express");
const router = express.Router();
const employeeDetails = require("../models/Schema");

// Middleware to check for duplicate values
const checkDuplicate = async (req, res, next) => {
  const { name } = req.body;
  const existingUser = await employeeDetails.findOne({ name });
  if (existingUser) {
    return res.status(400).json({ error: "Book is already exists" });
  }
  next();
};

// middleware to check for empty values.
const checkEmpty = (req, res, next) => {
  const { name, id, phone, address, department } = req.body;

  if (!name || !id || !phone || !address || !department) {
    return res.status(400).json({ error: "All fields are  required" });
  }
  next();
};

//post
router.post("/", checkDuplicate, checkEmpty, async (req, res) => {
  try {
    const employeePost = new employeeDetails({
      name: req.body.name,
      id: req.body.id,
      phone: req.body.phone,
      address: req.body.address,
      department: req.body.department,
    });

    await employeePost.save();
    return res.status(201).json(employeePost);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

// get for single user

router.get("/:id", async (req, res) => {
  try {
    const employeeget = await employeeDetails.findOne({ _id: req.params.id });
    res.send(employeeget);
  } catch (err) {
    res.status(404).send({ error: "Employee does not exist! " });
  }
});

// get for all user
router.get("/", async (req, res) => {
  try {
    const employeeAll = await employeeDetails.find();
    return res.status(200).json(employeeAll);
  } catch (err) {
    return res.status(500).send({ error: "Server error" });
  }
});

// Delete Users
router.delete("/:id", async (req, res) => {
  try {
    await employeeDetails.deleteOne({ _id: req.params.id });
    console.log("Employee deleted successfully.");
    return res.status(204).send({ message: "Delete Employee" });
  } catch (err) {
    console.error("Error deleting book:", err);
    return res.status(404).send({ error: " Employee  does not  exist" });
  }
});

// Edit Request
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = req.body;

    const updateEmployeeData = await employeeDetails.findByIdAndUpdate(id, updatedEmployee, {
      new: true,
    });
    if (!updateEmployeeData) {
      return res.status(404).json({ error: "Employee not found" });
    }
    return res.status(200).json(updateEmployeeData);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
