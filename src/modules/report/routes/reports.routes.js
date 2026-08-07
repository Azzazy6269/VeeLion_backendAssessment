const express = require('express');

const reportsController = require('../controllers/reports.controller');
const asyncHandler = require('../../../middleware/asyncHandler');
const reportsValidator = require('./../utils/validators');
const validate = require('../../../middleware/validate');

const reportsRouter = express.Router();

reportsRouter.get(
  '/tasks-summary',
  asyncHandler(reportsController.getTasksSummary)
);

module.exports = reportsRouter;