const path = require('node:path');
const { readJsonArray, writeJsonArray } = require('../../../utils/jsonStore');
const HttpError = require('../../../utils/httpError');
const { createId } = require('../../../utils/id');

const Activities_FILE_PATH = path.join(process.cwd(), 'data', 'activity.json');

function buildActivityRecord(payload) {
  const now = new Date().toISOString();

  return {
    id: createId(),
    action: payload.action,
    info: payload.info,
    when: now
  };
}

async function getAllActivities({page, limit}) {
  const activities = await readJsonArray(Activities_FILE_PATH);
  const totalItems = activities.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;

  if(page>totalPages){
    throw new HttpError(404,"page not found. You exceeded total pages")
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedActivities = activities.slice(startIndex, endIndex);

  return {
    paginatedActivities,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

async function createNewActivity(payload) {
  const activities = await readJsonArray(Activities_FILE_PATH);
  const newActivity = buildActivityRecord(payload);

  activities.push(newActivity);
  await writeJsonArray(Activities_FILE_PATH,activities);
  return newActivity;
}

module.exports = {
  getAllActivities,
  createNewActivity,
};
