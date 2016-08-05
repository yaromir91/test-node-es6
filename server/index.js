import Promise from 'bluebird';
import mongoose from 'mongoose';
import config from './config/env';
import app from './config/express';

// promisify mongoose
//Promise.promisifyAll(mongoose);

// connect to mongo db
mongoose.connect(config.default.db, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.default.db}`);
});

const debug = require('debug')('nodejsES6');

// listen on port config.port
app.listen(config.default.port, () => {
  console.log(`server started on port ${config.default.port} (${config.default.env})`);
});

export default app;
