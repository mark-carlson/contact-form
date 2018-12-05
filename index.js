import app from './app';
import env from './config/env';

const server = app.listen(process.env.PORT || env.port, () => {
  console.log(`${env.name} server is listening at port ${process.env.PORT || env.port}`);
});

export default server;
