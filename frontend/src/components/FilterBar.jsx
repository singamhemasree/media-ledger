const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "want-to", label: "Want to" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

const RATING_OPTIONS = [
  { value: "", label: "Any rating" },
  { value: "4", label: "4+ stars" },
  { value: "3", label: "3+ stars" },
  { value: "1", label: "1+ stars" },
];

export default function FilterBar({ filters, onChange, genres }) {
  const update = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  return (
    <>
      <select className="filter-select" value={filters.type} onChange={update("type")} aria-label="Filter by type">
        <option value="">All types</option>
        <option value="book">Books</option>
        <option value="movie">Movies</option>
      </select>

      <select className="filter-select" value={filters.genre} onChange={update("genre")} aria-label="Filter by genre">
        <option value="">All genres</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select className="filter-select" value={filters.status} onChange={update("status")} aria-label="Filter by status">
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        value={filters.minRating}
        onChange={update("minRating")}
        aria-label="Filter by minimum rating"
      >
        {RATING_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
}
