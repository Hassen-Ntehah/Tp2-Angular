const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /tasks: Retrieve all tasks (sorted with newest first)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des tâches',
      error: error.message
    });
  }
});

// POST /tasks: Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Le titre est requis' });
    }

    const newTask = new Task({
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: completed === true
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({
      message: 'Erreur lors de la création de la tâche',
      error: error.message
    });
  }
});

// PUT /tasks/:id: Update an existing task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (completed !== undefined) updateData.completed = Boolean(completed);

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({
      message: 'Erreur lors de la mise à jour de la tâche',
      error: error.message
    });
  }
});

// DELETE /tasks/:id: Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.json({
      message: 'Tâche supprimée avec succès',
      task: deletedTask
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la suppression de la tâche',
      error: error.message
    });
  }
});

module.exports = router;
