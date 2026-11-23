const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todolist_mean';

// Configure CORS for Angular frontend (http://localhost:4200)
const corsOptions = {
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Root health check route
app.get('/', (req, res) => {
  res.json({ message: 'API Gestion des tâches MEAN Stack en ligne' });
});

// Mount tasks router
app.use('/tasks', tasksRouter);

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connecté avec succès à MongoDB: ${MONGODB_URI}`);
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT} (http://localhost:${PORT})`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB:', err.message);
    // Still allow server to listen for diagnostics if needed or fail fast
    process.exit(1);
  });
