import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    type: { type: String, enum: ["book", "movie"], required: true },
    creator: { type: String, required: [true, "Author/Director is required"], trim: true },
    genre: { type: String, trim: true, default: "Unspecified" },
    status: { type: String, enum: ["want-to", "in-progress", "completed"], default: "want-to" },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    review: { type: String, trim: true, default: "" },
    coverColor: { type: String, default: "#6B8F71" },
  },
  { timestamps: true }
);

itemSchema.index({ title: "text", creator: "text" });

export default mongoose.model("Item", itemSchema);
