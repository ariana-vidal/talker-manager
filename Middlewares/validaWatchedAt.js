const verificaDate = require('../utils/verificaDate');

const validaWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!verificaDate(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = validaWatchedAt;