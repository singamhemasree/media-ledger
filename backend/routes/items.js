import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, type, genre, status, minRating } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { creator: { $regex: search, $options: "i" } },
      ];
    }
    if (type) query.type = type;
    if (genre) query.genre = { $regex: `^${genre}$`, $options: "i" };
    if (status) query.status = status;
    if (minRating) query.rating = { $gte: Number(minRating) };

    const items = await Item.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch items", details: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch item", details: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const item = new Item(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Could not create item", details: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Item not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Could not update item", details: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: "Could not delete item", details: err.message });
  }
});

export default router;
