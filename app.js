const express = require('express');
const cors = require('cors');
const userRouter = require('./database/routers/userRouter');
const orderRouter = require('./database/routers/orderRouter');
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

module.exports = app;