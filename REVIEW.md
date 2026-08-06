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
