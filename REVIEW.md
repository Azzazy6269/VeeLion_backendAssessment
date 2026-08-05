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
**Category:** Maintainability
**What is wrong:** The server handles requests silently without showing any information about it
**Why it is a problem:** If an error occured you can't define it. You need to make monitoring the server easier
**How to improve:** Install and use Morgan package to show data about requests like (HTTP Method, URL, Status Code, Response Time, Response Size in dev mood) morever, IP address and referrer in combined mood. There's other moods like: common, tiny and short