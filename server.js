const express = require('express');
const noteRoutes = require('./src/routes/note.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/notes', noteRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Notes API running on http://localhost:${PORT}`);
});
