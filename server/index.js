import express from 'express';
import swaggerUI from 'swagger-ui-express';
import debug from 'debug';
import userRouter from './routes/users';
import busRouter from './routes/buses';
import tripRouter from './routes/trips';
import bookingRouter from './routes/bookings';
import swaggerDoc from '../swagger.json';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/buses', busRouter);
app.use('/api/v1/trips', tripRouter);
app.use('/api/v1/bookings', bookingRouter);
app.get('/api/v1', (req, res) => {
  res.send('Welcome to Way Farer');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug('http')(`App is listening on Port ${port}`);
});

export default app;
