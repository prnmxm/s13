const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const { PORT = 3000 } = process.env;
const helmet = require('helmet');
const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', userRoutes);
app.use('/', cardsRoutes);
app.all('*', (req, res) => res.status(404).json({ message: 'Запрашиваемый ресурс не найден' }));
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
