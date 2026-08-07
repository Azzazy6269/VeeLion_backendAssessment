const path = require('node:path');
const { readJsonArray, writeJsonArray } = require('../../../utils/jsonStore');

const Activities_FILE_PATH = path.join(process.cwd(), 'data', 'activity.json');


async function getAllActivity() {
  const activities = await readJsonArray(Activities_FILE_PATH);
  return activities;
}

async function createNewActivity(payload) {
  const activities = await readJsonArray(Activities_FILE_PATH);
  const newActivity = {
    id: String(Date.now()),
    action: payload.action,
    info: payload.info,
    when: new Date().toISOString(),
  };

  activities.push(newActivity);
  writeJsonArray(Activities_FILE_PATH,activities);
  return newActivity;
}

module.exports = {
  getAllActivity,
  createNewActivity,
};
