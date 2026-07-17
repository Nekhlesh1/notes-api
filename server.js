const express = require('express');
const noteRoutes = require('./src/routes/note.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/notes', noteRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Hello from v3.0.0');
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Notes API is running on http://localhost:${PORT}`);
});