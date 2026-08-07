const express = require('express');

const asyncHandler = require('../../../middleware/asyncHandler');
const tasksController = require('../controllers/tasks.controller');
const validate = require('../../../middleware/validate');
const taskValidator = require('../utils/validators');

const tasksRouter = express.Router();

tasksRouter.get('/',
     validate({query:taskValidator.validateListTasks}),
     asyncHandler(tasksController.listTasks)
    );

tasksRouter.get('/:id',
    validate({params:taskValidator.validateGetTask}),
     asyncHandler(tasksController.getTask)
    );

tasksRouter.post('/',
     validate({body:taskValidator.validateCreateTask}),
     asyncHandler(tasksController.createTask)
    );

tasksRouter.patch('/:id',
     validate({
        body:taskValidator.validateUpdateTaskBody,
        params:taskValidator.validateUpdateTaskParams}),
     asyncHandler(tasksController.patchTask)
    );

tasksRouter.delete('/:id',
     validate({params:taskValidator.validateDeleteTask}),
     asyncHandler(tasksController.removeTask)
    );

module.exports = tasksRouter;
