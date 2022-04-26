const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./Middlewares/talker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const retTalker = await talker();
  res.status(200).json(retTalker);
});

app.get('/talker/:id', async (req, res) => {
  const retTalker = await talker();
  const { id } = req.params;
  const talkeid = retTalker.find((r) => r.id === parseFloat(id));
  console.log(talkeid);
  if (!talkeid) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talkeid);
});

app.listen(PORT, () => {
  console.log('Online');
});
