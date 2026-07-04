import ItemCard from "./ItemCard.jsx";

export default function ItemGrid({ items, onEdit, onDelete, onCycleStatus }) {
  if (items.length === 0) {
    return (
      <div className="item-grid">
        <div className="empty-state">
          No entries match the drawer you've opened. Try clearing a filter, or add something new.
        </div>
      </div>
    );
  }

  return (
    <div className="item-grid">
      {items.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onCycleStatus={onCycleStatus}
        />
      ))}
    </div>
  );
}
