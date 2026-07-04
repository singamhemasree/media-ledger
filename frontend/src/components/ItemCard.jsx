function callNumber(item) {
  const prefix = item.type === "book" ? "B" : "M";
  const suffix = item._id ? item._id.slice(-4).toUpperCase() : "0000";
  return `${prefix}-${suffix}`;
}

function stars(rating) {
  if (!rating) return "unrated";
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

export default function ItemCard({ item, onEdit, onDelete, onCycleStatus }) {
  return (
    <div className={`catalog-card ${item.status === "in-progress" ? "in-progress" : ""}`}>
      {item.status === "completed" && <div className="stamp">Completed</div>}

      <span className="call-number">{callNumber(item)}</span>
      <h3>{item.title}</h3>
      <p className="creator">{item.creator}</p>

      <div className="tag-row">
        <span className="tag">{item.type}</span>
        <span className="tag">{item.genre}</span>
      </div>

      <div className="rating-row">{stars(item.rating)}</div>

      {item.review && <p className="review-text">{item.review}</p>}

      <div className="card-actions">
        <button onClick={() => onCycleStatus(item)}>Status →</button>
        <button onClick={() => onEdit(item)}>Edit</button>
        <button className="danger" onClick={() => onDelete(item)}>
          Delete
        </button>
      </div>
    </div>
  );
}
