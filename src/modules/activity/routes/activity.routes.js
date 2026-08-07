const express = require('express');

const activityController = require('../controllers/activity.controller');
const asyncHandler = require('../../../middleware/asyncHandler');

const activityRouter = express.Router();

activityRouter.get('/', asyncHandler(activityController.listActivities));
activityRouter.post('/', asyncHandler(activityController.createNewActivity));

module.exports = activityRouter;
