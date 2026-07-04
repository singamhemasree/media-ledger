import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["book", "movie"],
      required: true,
    },
    creator: {
      // author for books, director for movies
      type: String,
      required: [true, "Author/Director is required"],
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
      default: "Unspecified",
    },
    status: {
      type: String,
      enum: ["want-to", "in-progress", "completed"],
      default: "want-to",
    },
    rating: {
      // 0 = unrated, 1-5 stars otherwise
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    review: {
      type: String,
      trim: true,
      default: "",
    },
    coverColor: {
      // lets the frontend render a consistent accent per item without an image upload pipeline
      type: String,
      default: "#6B8F71",
    },
  },
  { timestamps: true }
);

// Supports the search bar (title/creator) and genre filter efficiently
itemSchema.index({ title: "text", creator: "text" });

export default mongoose.model("Item", itemSchema);
