const express = require('express');
const NoteController = require('../controllers/note.controller');

const router = express.Router();

router.post('/', NoteController.create);
router.get('/', NoteController.findAll);
router.get('/:id', NoteController.findOne);
router.put('/:id', NoteController.update);
router.delete('/:id', NoteController.delete);

module.exports = router;
