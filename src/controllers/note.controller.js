const NoteService = require('../services/note.service');

const NoteController = {
    create(req, res) {
        const { title, content } = req.body || {};

        if (!title || typeof title !== 'string') {
            return res.status(400).json({ message: 'title is required and must be a string' });
        }
        if (content !== undefined && typeof content !== 'string') {
            return res.status(400).json({ message: 'content must be a string' });
        }

        const note = NoteService.create({ title, content });
        return res.status(201).json(note);
    },

    findAll(req, res) {
        const notes = NoteService.getAll();
        return res.status(200).json(notes);
    },

    findOne(req, res) {
        const { id } = req.params;
        const note = NoteService.getById(id);

        if (!note) {
            return res.status(404).json({ message: `Note with id ${id} not found` });
        }
        return res.status(200).json(note);
    },

    update(req, res) {
        const { id } = req.params;
        const { title, content } = req.body || {};

        if (title === undefined && content === undefined) {
            return res.status(400).json({ message: 'At least one of title or content must be provided' });
        }
        if (title !== undefined && typeof title !== 'string') {
            return res.status(400).json({ message: 'title must be a string' });
        }
        if (content !== undefined && typeof content !== 'string') {
            return res.status(400).json({ message: 'content must be a string' });
        }

        const note = NoteService.update(id, { title, content });
        if (!note) {
            return res.status(404).json({ message: `Note with id ${id} not found` });
        }
        return res.status(200).json(note);
    },

    delete(req, res) {
        const { id } = req.params;
        const success = NoteService.remove(id);

        if (!success) {
            return res.status(404).json({ message: `Note with id ${id} not found` });
        }
        return res.status(200).json({ message: `Note with id ${id} deleted` });
    },
};

module.exports = NoteController;
