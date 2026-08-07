const activityService = require('../services/activity.service');

async function listActivities(req, res) {
  const {page, limit} = req.query
  const activities = await activityService.getAllActivities({page, limit});
  res.status(200).json(activities);
}

async function createNewActivity(req, res) {
  const bodyData = req.body || {};
  const newActivity = await activityService.createNewActivity(bodyData);
  res.status(201).json({data:{newActivity}});
}

module.exports = {
  listActivities,
  createNewActivity,
};
