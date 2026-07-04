export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search by title or author/director…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search catalog"
    />
  );
}
