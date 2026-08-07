const express = require('express');

const activityController = require('../controllers/activity.controller');

const activityRouter = express.Router();

activityRouter.get('/', activityController.listActivities);
activityRouter.post('/', activityController.createNewActivity);

module.exports = activityRouter;
