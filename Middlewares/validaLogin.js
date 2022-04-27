const validaLogin = (req, res, next) => {
    const { email, password } = req.body;
    const regex = /\S+@\S+\.\S+/;
    if (!email) {
          return res.status(400).json({ message: 'O campo "email" é obrigatório' });
        }
    if (!regex.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    if (!password) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }

    if (password.length <= 5) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }

    next();
};

module.exports = validaLogin;
