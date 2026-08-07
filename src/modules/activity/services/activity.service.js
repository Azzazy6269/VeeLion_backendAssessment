const fs = require('node:fs');
const path = require('node:path');
const { readJsonArray, writeJsonArray } = require('../../../utils/jsonStore');

const filePath = path.join(process.cwd(), 'data', 'activity.json');


async function getAllActivity() {
  const activities = await readJsonArray(filePath);
  return activities;
}

async function createNewActivity(payload) {
  const activities = await readJsonArray(filePath);
  const newActivity = {
    id: String(Date.now()),
    action: payload.action,
    info: payload.info,
    when: new Date().toISOString(),
  };

  activities.push(newActivity);
  writeJsonArray(filePath,activities);
  return newActivity;
}

module.exports = {
  getAllActivity,
  createNewActivity,
};
