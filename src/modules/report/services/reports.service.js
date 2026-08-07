const path = require('node:path');
const { readJsonArray } = require('../../../utils/jsonStore');

const TASKS_FILE_PATH = path.join(process.cwd(), 'data', 'tasks.json');
const ACTIVITIES_FILE_PATH = path.join(process.cwd(), 'data', 'activity.json');

async function getTasksSummary() {
  const tasks = await readJsonArray(TASKS_FILE_PATH);
  const activities = await readJsonArray(ACTIVITIES_FILE_PATH);

  const total = tasks.length;

  let doneCount = 0;
  let inProgressCount = 0;
  let todoCount = 0;

  for (const task of tasks) {
    if (task.completed === true) {
      doneCount++;
    } else {
      const createdAtTime = new Date(task.createdAt).getTime();
      const updatedAtTime = new Date(task.updatedAt).getTime();

      if (updatedAtTime > createdAtTime) {
        inProgressCount++;
      } else {
        todoCount++;
      }
    }
  }

  const recentActivityCount = activities.length;

  return {
    total,
    byStatus: {
      todo: todoCount,
      'in-progress': inProgressCount,
      done: doneCount,
    },
    recentActivityCount,
  };
}

module.exports = {
  getTasksSummary,
};