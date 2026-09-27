const express = require('express');

const app = express();

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

app.listen(PORT, () => {
  console.log(`🔥 Servidor funcionando en el puerto ${PORT}`);
});