const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: String, required: true }, // stores admin username
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
