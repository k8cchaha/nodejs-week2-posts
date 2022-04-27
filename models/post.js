const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    tags: Array,
    image: String,
    likes: Number,
    comments: Number,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
