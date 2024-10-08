const express = require('express');
const path = require('node:path')
const userRouter = require('./routes/userRouter')
const PORT = process.env.PORT || 3005;

const app = express();

app.set('views', path.joint(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use('/', userRouter);

app.listen(PORT);
