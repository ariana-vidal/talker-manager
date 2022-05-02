const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs').promises;
const talker = require('./Middlewares/talker');
const validaLogin = require('./Middlewares/validaLogin');
const addTalker = require('./Middlewares/addTalker');
const validaNameEage = require('./Middlewares/validaNameEage');
const validaTalk = require('./Middlewares/validaTalk');
const validaRate = require('./Middlewares/validaRate');
const validaWatchedAt = require('./Middlewares/validaWatchedAt');
const validaToken = require('./Middlewares/validaToken');
const editTalker = require('./Middlewares/editTalker');

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

app.post('/login', validaLogin, (_req, res) => {
  try {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).end();
  }
});

app.post('/talker',
  validaToken,
  validaNameEage,
  validaTalk,
  validaWatchedAt,
  validaRate, async (req, res) => {
  try {
    const { name, age, talk, watchedAt, rate } = req.body;
    const talke = await addTalker.getTalker();

    if (talke.map((palestrante) => palestrante.name).includes(name)) {
      return res.status(409).json({ message: 'id já cadastrado' });
    }

    const newTalker = { name, age, talk, watchedAt, rate, id: talke.length + 1 };

    talke.push(newTalker);

    await addTalker.setTalker(talke);

    return res.status(201).json(newTalker);
  } catch (error) {
    return res.status(500).end();
  }
});

app.put('/talker/:id',
  validaToken,
  validaNameEage,
  validaTalk,
  validaRate,
  validaWatchedAt,
  editTalker,
  (_req, _res) => {
    
});

app.delete('/talker/:id', validaToken, async (req, res) => {
  const { id } = req.params;

  const talkers = await fs.readFile('talker.json')
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err.message));

  const newList = talkers.filter((person) => person.id !== Number(id));
  fs.writeFile('talker.json', JSON.stringify(newList));
  return res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
