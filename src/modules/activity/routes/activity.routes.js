const express = require('express');

const activityController = require('../controllers/activity.controller');
const asyncHandler = require('../../../middleware/asyncHandler');
const activityValidator = require('../utils/validators');
const validate = require('./../../../middleware/validate')
const activityRouter = express.Router();

activityRouter.get('/',
    validate({query:activityValidator.validateListActivities}),
    asyncHandler(activityController.listActivities));

activityRouter.post('/',
     validate({body:activityValidator.validateCreateActivity}),
     asyncHandler(activityController.createNewActivity));

module.exports = activityRouter;
