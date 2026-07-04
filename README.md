# Media Ledger

A full-stack digital catalog for books and movies — search, filter, log status (want-to / in-progress / completed), and rate what you've watched or read.

**Stack:** React (Vite) · Express · MongoDB (Mongoose)

## Design concept
Cards are styled like library catalog index cards — a perforated top edge, a call-number label (e.g. `B-3F2A` for books, `M-91C0` for movies), and a rotated red "Completed" stamp on finished entries.

## Tech breakdown
- **Frontend:** React components (`App.jsx`, `SearchBar.jsx`, `FilterBar.jsx`, `ItemGrid.jsx`, `ItemCard.jsx`, `AddEditModal.jsx`) with debounced search and live filtering.
- **Backend:** Express REST API (`server.js`, `items.js`) with routes for create, read, update, delete, plus query-based search/filter.
- **Database:** MongoDB via Mongoose (`Item.js`) — schema stores title, author/director, genre, status, rating, and review text, with a text index on title/creator for search.

## API
| Method | Route          | Purpose                        |
|--------|----------------|---------------------------------|
| GET    | /api/items     | List items (search, type, genre, status, minRating filters) |
| POST   | /api/items     | Create an item                 |
| PUT    | /api/items/:id | Update an item                 |
| DELETE | /api/items/:id | Delete an item                 |

## Running locally
This repo currently needs to be split into `backend/` and `frontend/` folders with their own `package.json` installs, then run separately — see project notes for the full setup steps.

## Status
Work in progress — structuring for deployment (Vercel/Render/Atlas).
