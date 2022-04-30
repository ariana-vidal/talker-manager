const validaToken = (req, res, next) => {
  console.log(req);
  const { headers: { authorization } } = req;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
    next();
};

module.exports = validaToken;