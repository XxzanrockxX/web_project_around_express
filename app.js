const express = require('express');

const mongoose = require('mongoose');

mongoose.connect('mongodb://172.20.240.1:27017/aroundb');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6ac32597d8b185c52cb5b706',
  };

  next();
});

app.get('/test', (req, res) => {
  res.json({ message: 'Servidor funcionando' });
});

const PORT = 3000;

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use(usersRouter);
app.use(cardsRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Recurso solicitado no encontrado',
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Ha ocurrido un error en el servidor',
  });
});

const server = app.listen(PORT);

server.on('listening', () => {
  console.log('🔥 EVENTO LISTENING');
  console.log('Servidor escuchando:', server.listening);
});

server.on('error', (err) => {
  console.log('🔥 EVENTO ERROR');
  console.log(err);
});

server.on('close', () => {
  console.log('🔥 EVENTO CLOSE');
});
