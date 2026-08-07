const {validateUpdateTaskBody,validateUpdateTaskParams} = require('./updateTask.validator');
const validateCreateTask = require('./createTask.validator');
const validateListTasks = require('./listTasks.validator');
const validateGetTask = require('./getTask.validator');
const validateDeleteTask = require('./deleteTask.validator');

module.exports = {
  validateCreateTask,
  validateUpdateTaskBody,
  validateUpdateTaskParams,
  validateListTasks,
  validateGetTask,
  validateDeleteTask
};
