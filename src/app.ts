import { config } from 'dotenv';
import morgan from 'morgan';

config();

import express from 'express';
import router from './api/v1/routes/index';
import errorHandler from 'middleware/error';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/', router);

app.get('/', (req, res) => {
  res.json({ message: 'Server is up and running' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
