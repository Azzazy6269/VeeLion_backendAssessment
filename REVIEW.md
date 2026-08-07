### 1. Missing Environment Variables Configuration (`server.js`)
**Category:** Bugs
**What is wrong:** The `dotenv` library was neither installed nor loaded via `dotenv.config()` at the application entry point.
**Why it is a problem:** `process.env` variables (such as `PORT`) will evaluate to `undefined`. The application will silently fail to read environment configurations and always default to fallback values.
**How to improve:** Install the `dotenv` package (`npm install dotenv`) and invoke `require('dotenv').config()` at the very top of `server.js` before requiring any other application files.


### 2. Use Helmet to add security headers to the server
**Category:** Security
**What is wrong:** The application does not set standard HTTP security headers
**Why it is a problem:** The server is vulnerable to dangerous attacks like Cross-Site Scripting (XSS), Clickjacking and others
**How to improve:** use helmet package to set security headers



### 3. Use the CORS package to specify who can access the APIs
**Category:** Security
**What is wrong:** The application does not have CORS configured.
**Why it is a problem:** Requests from the frontend application will be blocked by the browser due to the Same-Origin Policy.
**How to improve:** Install and configure the CORS middleware, specifying the allowed origins.


### 4. Use Morgan package to show requests details
**Category:** Maintainability & Code quality
**What is wrong:** The server handles requests silently without showing any information about it
**Why it is a problem:** If an error occured you can't define it. You need to make monitoring the server easier
**How to improve:** Install and use Morgan package to show data about requests like (HTTP Method, URL, Status Code, Response Time, Response Size in dev mood) morever, IP address and referrer in combined mood. There's other moods like: common, tiny and short


### 5. Use XSS package to prevent cross site scripting
**Category:** Security
**What is wrong:** Hackers can send scripts as data to be run in the server.
**Why it is a problem:** scripts can be sent to the server to affect it's behaviour.
**How to improve:** Install and use XSS.


### 6. Vulnerability to HTTP Parameter Pollution - HPP
**Category:** Security
**What is wrong:** The API does not prevent or clean up duplicate query parameters in HTTP requests.
**Why it is a problem:** HTTP Parameter Pollution can cause Express to parse query parameters as arrays instead of strings, leading to unexpected application errors.
**How to improve:** Install and use HPP.


### 7. Refactor ErrorHandler and httpError
**Category:** Security / Maintainability
**What is wrong:** ErrorHandler sends same error structure and print iy in terminal in most cases.
**Why it is a problem:** ErrorHandler doesn't distinguish between different cases like whether it's development or production and whether it's operational error or not. It sends same error structure in response and print same data in terminal in all cases. for example: In production, returning raw stack traces or internal messages for unknown 500 errors leaks sensitive system details (Security risk). Conversely, hiding error details during development hinders debugging
**How to improve:** implemented consts IsDev, IsOperational, IsOperationalOrDev to specify responses and logs


### 8. Validate Middleware
**Category:** Code quality
**What is wrong:** there's no tunnel between router and validation files.
**Why it is a problem:** Data will not validated is expected which leads to save unwanted data.
**How to improve:** Wrote Validate middleware which takes req.body and passes it after apply validation or throw httpError


### 9. Rate Limiting Middleware
**Category:** Security
**What is wrong:** The application lacked request rate limiting, exposing APIs to abuse.
**Why it is a problem:** Malicious actors or runaway clients could overwhelm the server with excessive requests, leading to Denial of Service (DoS/DDoS) or resource exhaustion.
**How to improve:** Integrated the `express-rate-limit` package to throttle incoming client requests.


### 10. ESlint, jsconfig.js
**Category:** Maintainability
**What is wrong:** The project lacks standard code linting rules (ESLint) and an explicit module resolution configuration
**Why it is a problem:** code quality issues, unused variables, undefined variables, inconsistent code styling, wrong requird params, and potential syntax bugs go unnoticed.
**How to improve:** Used ESlint and jsconfig to discover undefined Variables, unused Var, wrong num of params and formatting bugs


### 11. Remove Validation from Tasks Controller and Service and rely Validation Middleware
**Category:** Bug / Code Quality
**What is wrong:** The Tasks module has a validation file, but the request flow does not depend on it. Instead, validation is performed in both the controller and the service.
**Why it is a problem:** `req.body` is validated multiple times across different files instead of relying on a single validation middleware. This can lead to conflicts, unintended bugs, and a violation of the application's architecture.
**How to improve:** Remove validation logic from the Tasks controller and service, and rely on the validation middleware to handle request validation.


### 12. Used Pagination with list all tasks
**Category:** Performance
**What is wrong:** When client call listTasks controller it retrieve all tasks stored in json file.
**Why it is a problem:** If we have longer list of tasks, It will take time and consume resources to get all tasks while we have no idea if user really wants all of them or he can find the one he looks for in the first page.
**How to improve:** apply pagination by getting page and limit in req.query.


### 13. Validate req.query and req.params
**Category:** Bugs / Performance
**What is wrong:** taskValidator validates only req.body.
**Why it is a problem:** client can send invalid params or query which leads to bugs and consume resources while we can prevent the request before it's get handled by controller.
**How to improve:** implement validation for params and query and allow validate middleware to accept 3 validator functions( validator.body, validator.params, validator.query).


### 14. Exchange Monolithic Task Validator Structure
**Category:** Maintainability / Code quality
**What is wrong:** All task validation rules were kept in a single `taskValidator.js` file despite each endpoint having distinct requirements.
**Why it is a problem:** Placing all validators in one file makes it bloated, hard to navigate, and increases the risk of side effects when modifying specific endpoint logic.
**How to improve:** Modularized validation into operation-specific files (`createTask.validator.js`, `updateTask.validator.js`, etc.), extracted shared logic into `validator.js`, and exposed them via a clean `index.js` entry point.


### 15. Used readJsonArray, writeJsonArray from jsonStore in activity service
**Category:** Code quality
**What is wrong:** The Activity service used it's own logic to read and writ json instead of reusing the centralized helper functions (`readJsonArray` and `writeJsonArray`) provided by `jsonStore.js`.
**Why it is a problem:** Duplicate file I/O handling creates code redundancy and makes future file storage updates or error-handling improvements harder to maintain across services.
**How to improve:** Refactored `activity.service.js` to utilize `readJsonArray` and `writeJsonArray` from `jsonStore.js` for consistent and centralized JSON file management.


### 16. Used suitable names for variables, functions, and functions params in activity module
**Category:** Code quality
**What is wrong:** most variables, functions and functions params in activity module( controllev, service, routes ) don't descripe their values well.
**Why it is a problem:** This makes code unreadable and hard to reusable as you have to follow every function and variable to understand it's role in the code. It makes it hard to scale out the code and add more endpints as every file will have tens of variables and functions that we can't understand easily what its role is.
**How to improve:** Replace their names with more suitable names.


### 17. Used asyncHandler in activity.routes.js
**Category:** Bugs
**What is wrong:** There's no Handler for the requests to catch errors.
**Why it is a problem:** Any error happens due to unexpected data or any other reasons can crash the server.
**How to improve:** Used our global asyncHandler.


### 18. Used async/await in activity controller and service
**Category:** Bugs
**What is wrong:** although read and write in json file happens asynchronously and return promises but the code doesn't use async/await with them.
**Why it is a problem:** The code will not work asynchrounsly and it will return response to the client before data logic was handled by jsonStore.js.
**How to improve:** Used async/await in activity module.


### 19. Used Pagination with list all activities
**Category:** Performance
**What is wrong:** When client calls listActivities controller it retrieve all activities stored in json file.
**Why it is a problem:** If we have longer list of activities, It will take time and consume resources to get all activities while we have no idea if user really wants all of them or he can find the one he looks for in the first page.
**How to improve:** apply pagination by getting page and limit in req.query.


### 20. Implement Activity Validator
**Category:** Bugs / Code quality
**What is wrong:** There's no validation for activities requests.
**Why it is a problem:** This might save unwanted data or crash server if client called endpoint with unexpected inputs.
**How to improve:** Implement Modularized validation into operation-specific files (`createActivity.validator.js`, `listActivities.validator.js`, etc.), extracted shared logic into `validator.js`, and exposed them via a clean `index.js` entry point.


### 21. buildActivityRecord helper function Validator
**Category:** Code quality
**What is wrong:** Activity record construction logic was tightly coupled within the service operation..
**Why it is a problem:** inline object creation reduces code reusability and maintainability.
**How to improve:** Extracted object formatting into a dedicated `buildActivityRecord` helper function for cleaner encapsulation.


### 22. Implementation of Reports Module

* **Category:** Maintainability / Code Quality
* **What is wrong:** The system lacked an analytics and insights aggregation endpoint (`GET /reports/tasks-summary`).
* **Why it is a problem:** Clients had no direct way to view high-level task status distribution (`todo`, `in-progress`, `done`) or total activity logs.
* **How to improve:** Created a dedicated, clean-architecture `Reports` module consisting of a service, controller, and route setup. Dynamically derived task statuses based on metadata comparisons (`completed` boolean and `updatedAt` vs `createdAt` timestamps) and fetch activities count to generate summary reports.(Although there's no data to validate in report requests, but I added validators folder to follow the archeticture of the project).