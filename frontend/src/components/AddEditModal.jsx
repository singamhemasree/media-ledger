import { useState } from "react";

const BLANK = {
  title: "",
  type: "book",
  creator: "",
  genre: "",
  status: "want-to",
  rating: 0,
  review: "",
};

export default function AddEditModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || BLANK);

  const update = (key) => (e) => {
    const value = key === "rating" ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [key]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.creator.trim()) return;
    onSave(form);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{initial ? "Edit entry" : "New catalog entry"}</h2>
        <form onSubmit={submit}>
          <label htmlFor="title">Title</label>
          <input id="title" value={form.title} onChange={update("title")} required />

          <label htmlFor="type">Type</label>
          <select id="type" value={form.type} onChange={update("type")}>
            <option value="book">Book</option>
            <option value="movie">Movie</option>
          </select>

          <label htmlFor="creator">{form.type === "book" ? "Author" : "Director"}</label>
          <input id="creator" value={form.creator} onChange={update("creator")} required />

          <label htmlFor="genre">Genre</label>
          <input id="genre" value={form.genre} onChange={update("genre")} placeholder="e.g. Sci-Fi" />

          <label htmlFor="status">Status</label>
          <select id="status" value={form.status} onChange={update("status")}>
            <option value="want-to">Want to</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>

          <label htmlFor="rating">Rating (0–5)</label>
          <input id="rating" type="number" min="0" max="5" value={form.rating} onChange={update("rating")} />

          <label htmlFor="review">Review</label>
          <textarea id="review" value={form.review} onChange={update("review")} />

          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
