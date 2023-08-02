const express = require("express");
const router = express.Router();
const book = require("../models/Schema");

// Middleware to check for duplicate values
const checkDuplicate = async (req, res, next) => {
  const { name } = req.body;
  const existingUser = await book.findOne({ name });
  if (existingUser) {
    return res.status(400).json({ error: "Book is already exists" });
  }
  next();
};

// middleware to check for empty values.
const checkEmpty = (req, res, next) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ error: "All fields are  required" });
  }
  next();
};

//post
router.post("/", checkDuplicate, checkEmpty, async (req, res) => {
  try {
    const bookPost = new book({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });

    await bookPost.save();
    return res.status(201).json(bookPost);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});


// get for single user

router.get("/:id", async (req, res) => {
  try {
    const bookget = await book.findOne({ _id: req.params.id });
    res.send(bookget);
  } catch (err) {
    res.status(404).send({ error: "Book does not exist! " });
  }
});

// get for all user
router.get("/", async (req, res) => {
  try {
    const bookAll = await book.find();
    return res.status(200).json(bookAll);
  } catch (err) {
    return res.status(500).send({ error: "Server error" });
  }
});

// Delete Users
router.delete("/:id", async (req, res) => {
  try {
    await book.deleteOne({ _id: req.params.id });
    console.log("Book deleted successfully.");
    return res.status(204).send({ message: "Delete book" });
  } catch (err) {
    console.error("Error deleting book:", err);
    return res.status(404).send({ error: " Book  does not  exist" });
  }
});

// Edit Request
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = req.body;

    const updateBookData = await book.findByIdAndUpdate(id, updatedBook, { new: true });
    if (!updateBookData) {
      return res.status(404).json({ error: "book not found" });
    }
    return res.status(200).json(updateBookData);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
