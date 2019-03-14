# contact-form

Built with [create-react-app](https://github.com/facebookincubator/create-react-app) and [express](https://expressjs.com/) server for development. Optimized for Heroku deployment.

## Features

- Uses Nodemailer to send email with a gmail account.
- React-materialize for UI elements and grid.
- React-sweetalert for email success/failure message.

## Prerequisites

- Must have gmail credentials.
- Base64 Encode your password and store your gmail username (you@gmail.com) and encoded password in /server/config/env.js

## Installing


```
npm install && cd frontend && npm install && cd ..
```

Enter gmail account and base64 encoded password in /server/config/env.js. Then...

```
npm run build
```

NOTE:  Windows users may need to change their root `package.json` line:

```"dev": "NODE_ENV=dev nodemon``` to ```"dev": "SET NODE_ENV=dev&& nodemon```

and

```"prod": "NODE_ENV=production nodemon``` to ```"prod": "SET NODE_ENV=production&& nodemon```


To authorize gmail access from Heroku, visit this site after deployment: [http://www.google.com/accounts/DisplayUnlockCaptcha](http://www.google.com/accounts/DisplayUnlockCaptcha)

## Communication

### Dev

For Development, the webpack-dev-server is running on port 3000 serving react app, and the backend express server is running on port 4000. All of the requests sent by frontend app will be passed to express server via proxy.

Web App <--- Webpack-dev-server <---> Proxy <---> Express Server

### Production

For Production, all the frontend code will be compiled and moved into a static directory inside express server. Now there is just one express server running, which is serving both the frontend app and backend endpoints.

Endpoints <--- Express Server ---> Web App

## Authors

- **Mark Carlson, UCB Instructor** - [Mark Carlson](https://markcarlson.io)

## License

This project is licensed under the MIT License.
