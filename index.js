const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
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

app.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].includes(undefined)) {
      return res.status(401).json({ message: 'informações inválidas' });
    }

    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).end();
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
