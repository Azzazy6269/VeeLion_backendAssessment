const activityService = require('../services/activity.service');

function listActivities(req, res) {
  const activities = activityService.getAllActivity();
  res.json(activities);
}

function createNewActivity(req, res) {
  const bodyData = req.body || {};
  const newActivity = activityService.createNewActivity(bodyData);
  res.status(201).json(newActivity);
}

module.exports = {
  listActivities,
  createNewActivity,
};
