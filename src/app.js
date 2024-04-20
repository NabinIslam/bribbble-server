const express = require('express');
const cors = require('cors');
const createError = require('http-errors');

//router imports starts
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
//router imports ends

const { errorResponse } = require('./controllers/responseController');

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  '/',
  express.Router().get('/', (req, res) => res.send(`Server is running fine!`))
);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.use((req, res, next) => {
  next(createError(404, 'route not found'));
});

//server error handlers
app.use((err, req, res, next) => {
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

module.exports = app;
