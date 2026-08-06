const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { xss } = require('express-xss-sanitizer');
const hpp = require('hpp');

const tasksRouter = require('./modules/tasks/routes/tasks.routes');
const activityRouter = require('./modules/activity/routes/activity.routes');
const errorHandler = require('./middleware/errorHandler');
const HttpError = require('./utils/httpError');

const app = express();

app.use(helmet());

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
  app.use(morgan('dev'));
} else {
  console.log('Running in production mode');
  app.use(morgan('combined'));
}

app.use(express.json());
app.use(xss());
app.use(hpp());

app.use('/tasks', tasksRouter);
app.use('/activity', activityRouter);

app.use((req, res, next) => {
  next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`));
});

app.use(errorHandler);

module.exports = app;
