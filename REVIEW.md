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
