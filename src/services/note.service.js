const { randomUUID } = require('crypto');

const notes = [];

const NoteService = {
    getAll() {
        return notes;
    },

    getById(id) {
        return notes.find((note) => note.id === id);
    },

    create({ title, content }) {
        const note = {
            id: randomUUID(),
            title,
            content: content || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        notes.push(note);
        return note;
    },

    update(id, { title, content }) {
        const note = notes.find((n) => n.id === id);
        if (!note) return null;

        if (title !== undefined) note.title = title;
        if (content !== undefined) note.content = content;
        note.updatedAt = new Date().toISOString();

        return note;
    },

    remove(id) {
        const index = notes.findIndex((n) => n.id === id);
        if (index === -1) return false;
        notes.splice(index, 1);
        return true;
    },
};

module.exports = NoteService;
