import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import FilterBar from "./components/FilterBar.jsx";
import ItemGrid from "./components/ItemGrid.jsx";
import AddEditModal from "./components/AddEditModal.jsx";
import { fetchItems, createItem, updateItem, deleteItem } from "./api.js";

const STATUS_CYCLE = ["want-to", "in-progress", "completed"];

export default function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ type: "", genre: "", status: "", minRating: "" });
  const [modalItem, setModalItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const loadItems = async () => {
    try {
      setError("");
      const data = await fetchItems({ search, ...filters });
      setItems(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(loadItems, 250);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filters]);

  const genres = useMemo(() => {
    const set = new Set(items.map((i) => i.genre).filter(Boolean));
    return Array.from(set).sort();
  }, [items]);

  const openAddModal = () => {
    setModalItem(null);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setModalItem(item);
    setShowModal(true);
  };

  const handleSave = async (form) => {
    try {
      if (modalItem) {
        await updateItem(modalItem._id, form);
      } else {
        await createItem(form);
      }
      setShowModal(false);
      loadItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm(`Remove "${item.title}" from the ledger?`)) return;
    try {
      await deleteItem(item._id);
      loadItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCycleStatus = async (item) => {
    const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(item.status) + 1) % STATUS_CYCLE.length];
    try {
      await updateItem(item._id, { status: next });
      loadItems();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <span className="eyebrow">Personal Catalog · Est. Today</span>
        <h1>Media Ledger</h1>
        <p>Every book and film you've meant to get to, indexed like it matters — because it does.</p>
      </header>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar filters={filters} onChange={setFilters} genres={genres} />
        <button className="btn-primary" onClick={openAddModal}>
          + Add entry
        </button>
      </div>

      {error && <p style={{ color: "#b33a3a", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>{error}</p>}

      <ItemGrid items={items} onEdit={openEditModal} onDelete={handleDelete} onCycleStatus={handleCycleStatus} />

      {showModal && (
        <AddEditModal initial={modalItem} onSave={handleSave} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
