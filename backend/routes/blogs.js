const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const { protect } = require("../middleware/authMiddleware"); // JWT middleware for admin

// @desc    Get all blogs (Public)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Create a new blog (Admin only)
router.post("/", protect, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const blog = new Blog({
      title,
      content,
      createdBy: req.admin.username, // from JWT
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create blog" });
  }
});

// @desc    Update a blog (Admin only)
router.put("/:id", protect, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update blog" });
  }
});

// @desc    Delete a blog (Admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete blog" });
  }
});

module.exports = router;
