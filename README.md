# Notes API

A basic CRUD REST API for managing notes, built with Node.js and Express following the **MVC** architecture pattern.

- No authentication
- In-memory storage (notes are lost when the server restarts)

## Project Structure

```
notes-api/
├── package.json
├── server.js                           # App entry point
└── src/
    ├── models/
    │   └── note.model.js               # In-memory data layer
    ├── controllers/
    │   └── note.controller.js          # Request handlers / business logic
    └── routes/
        └── note.routes.js              # Route definitions
```

## Setup

```bash
cd notes-api
npm install
npm start
```

The server runs on `http://localhost:3000` by default. Override with `PORT=4000 npm start`.

## Endpoints

| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| POST   | `/notes`     | Create a new note     |
| GET    | `/notes`     | Retrieve all notes    |
| GET    | `/notes/:id` | Retrieve a note by id |
| PUT    | `/notes/:id` | Update a note         |
| DELETE | `/notes/:id` | Delete a note         |

### Note shape

```json
{
  "id": "uuid-string",
  "title": "string",
  "content": "string",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp"
}
```

## cURL Examples

### 1. Create a note — `POST /notes`

```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Shopping list","content":"Milk, eggs, bread"}'
```

**Response** `201 Created`:

```json
{
  "id": "9b3a...",
  "title": "Shopping list",
  "content": "Milk, eggs, bread",
  "createdAt": "2026-04-30T10:00:00.000Z",
  "updatedAt": "2026-04-30T10:00:00.000Z"
}
```

### 2. Get all notes — `GET /notes`

```bash
curl http://localhost:3000/notes
```

### 3. Get a note by id — `GET /notes/:id`

```bash
curl http://localhost:3000/notes/9b3a-xxxx-xxxx
```

### 4. Update a note — `PUT /notes/:id`

```bash
curl -X PUT http://localhost:3000/notes/9b3a-xxxx-xxxx \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated title","content":"Updated content"}'
```

You may send only one field:

```bash
curl -X PUT http://localhost:3000/notes/9b3a-xxxx-xxxx \
  -H "Content-Type: application/json" \
  -d '{"content":"Only content changed"}'
```

### 5. Delete a note — `DELETE /notes/:id`

```bash
curl -X DELETE http://localhost:3000/notes/9b3a-xxxx-xxxx
```

## Error Responses

| Status | When                                                  |
| ------ | ----------------------------------------------------- |
| 400    | Missing or invalid `title` / `content` in body        |
| 404    | Note id not found, or unknown route                   |
| 500    | Unhandled server error                                |

Error body shape:

```json
{ "message": "..." }
```
