const express = require('express');
const cors = require('cors');
const userRouter = require('./database/routers/userRouter');
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);

module.exports = app;