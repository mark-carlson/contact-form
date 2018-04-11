
# contact-form

Get started with [create-react-app](https://github.com/facebookincubator/create-react-app) and your own [express](https://expressjs.com/) server for development and production.

## Features

- Uses Nodemailer to send email with a gmail account.

## Prerequisites

- Must have gmail credentials.
- Base64 Encode your password and store your gmail username (you@gmail.com) and encoded password in /server/config/env.js

## Installing

First of all, you should install `create-express-react` via npm as a global package, this is the CLI to generate the template for you to get started.

```
npm install && cd frontend && npm install
```

Enter gmail account and base64 encoded password in /server/config/env.js

```
npm run build
```

## Communication

### Dev
For Development, the webpack-dev-server is running on port 3000 serving react app, and the backend express server is running on port 4000. All of the requests sent by frontend app will be passed to express server via proxy.

Web App <--- Webpack-dev-server <---> Proxy <---> Express Server

### Production
For Production, all the frontend code will be compiled and moved into a static directory inside express server. Now there is just one express server running, which is serving both the frontend app and backend endpoints.

Endpoints <--- Express Server ---> Web App

## Authors

* **Mark Carlson**  - [_Mark Carlson](https://markcarlson.io)

## License

This project is licensed under the MIT License.


