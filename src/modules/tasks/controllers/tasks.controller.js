const tasksService = require('../services/tasks.service');

async function listTasks(req, res) {
  const page = req.query.page;
  const limit = req.query.limit;
  const result = await tasksService.getAllTasks({ page, limit });
  res.status(200).json(result);
}

async function getTask(req, res) {
  const task = await tasksService.getTaskById(req.params.id);
  res.status(200).json({ data: {task} });
}

async function createTask(req, res) {
  const payload = req.body || {};

  const task = await tasksService.createTask(payload);

  res.status(201).json({ data: {"created task":task} });
}

async function patchTask(req, res) {
  const updates = req.body || {};

  const task = await tasksService.updateTask(req.params.id, updates);

  res.status(200).json({ data: {"updated task":task} });
}

async function removeTask(req, res) {
  const removedTask = await tasksService.deleteTask(req.params.id);
  res.status(204).send();
}

module.exports = {
  listTasks,
  getTask,
  createTask,
  patchTask,
  removeTask,
};
