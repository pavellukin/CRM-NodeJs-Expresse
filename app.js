const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const analyticsRouter = require('./routes/analytics');
const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/category');
const orderRouter = require('./routes/order');
const positionRouter = require('./routes/position');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.MONGO_URL)
    .then(() => console.info('MongoDB connected.'))
    .catch(err => console.error(err));

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/analytics', analyticsRouter);
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/order', orderRouter);
app.use('/api/position', positionRouter);

module.exports = app;