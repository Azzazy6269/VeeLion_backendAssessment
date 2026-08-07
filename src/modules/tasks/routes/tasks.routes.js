const express = require('express');

const asyncHandler = require('../../../middleware/asyncHandler');
const tasksController = require('../controllers/tasks.controller');
const validate = require('../../../middleware/validate');
const taskValidator = require('../utils/taskValidator');

const tasksRouter = express.Router();

tasksRouter.get('/', asyncHandler(tasksController.listTasks));
tasksRouter.get('/:id', asyncHandler(tasksController.getTask));
tasksRouter.post('/', validate(taskValidator.validateCreateTask), asyncHandler(tasksController.createTask));
tasksRouter.patch('/:id', validate(taskValidator.validateUpdateTask), asyncHandler(tasksController.patchTask));
tasksRouter.delete('/:id', asyncHandler(tasksController.removeTask));

module.exports = tasksRouter;
