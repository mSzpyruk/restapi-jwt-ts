import mongoose from 'mongoose';
import config from './db-config';

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(`${config.DB.URI}`, dbOptions);
const db = mongoose.connection;

db.once('open', () => console.log('MongoDB connected.'));

db.on('error', (err) => console.log(err));
