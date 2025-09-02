const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Adjust the path as needed
const roles = require('../middleware/roles'); // Adjust the path as needed

// Create task
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  try {
	const task = await Task.create({ title, description, ownerUid: req.user.uid });
	return res.status(201).json(task);
  } catch (err) {
	console.error(err);
	return res.status(500).json({ error: 'Server error' });
  }
});


// Read tasks - admin sees all, user sees their own
router.get('/', async (req, res) => {
try {
let tasks;
if (req.user.role === 'admin') {
tasks = await Task.find();
} else {
tasks = await Task.find({ ownerUid: req.user.uid });
}
return res.json(tasks);
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
});


// Update task - admin can update any, user only their own
router.put('/:id', async (req, res) => {
try {
const task = await Task.findById(req.params.id);
if (!task) return res.status(404).json({ error: 'Not found' });
if (req.user.role !== 'admin' && task.ownerUid !== req.user.uid) return res.status(403).json({ error: 'Forbidden' });


const { title, description, completed } = req.body;
if (title !== undefined) task.title = title;
if (description !== undefined) task.description = description;
if (completed !== undefined) task.completed = completed;


await task.save();
return res.json(task);
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
});


// Delete task - only admin
router.delete('/:id', roles(['admin']), async (req, res) => {
try {
const task = await Task.findById(req.params.id);
if (!task) return res.status(404).json({ error: 'Not found' });
await task.remove();
return res.json({ success: true });
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
});


module.exports = router;