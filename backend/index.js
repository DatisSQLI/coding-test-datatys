const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morganMiddleware = require('./middlewares/logger');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const user = require('./services/user')

const port = 3002;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(morganMiddleware);
app.get('/health', (req, res) => res.send({ message: 'ok' }));

app.get('/user/:id', async (req, res) => {
  res.send(await user.getById(req.params.id));
});

app.put('/user/:id', async (req, res) => {
    if (await user.update(req.params.id, req.body)) {
      res.send({});
    }

    // TODO : error handling
});

app.delete('/user/:id', async (req, res) => {
  if (await user.deleteAccount(req.params.id)) {
    res.send({});
  }

  // TODO : error handling
});

const server = app.listen(port, () => {
  console.log(`Datatys App running on port ${port}.`);
});
module.exports = server;
