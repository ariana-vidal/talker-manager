const fs = require('fs').promises;

const editTalker = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    body.id = Number(id);
  
    const talkers = await fs.readFile('talker.json')
      .then((data) => JSON.parse(data))
      .catch((err) => console.log(err.message));
  
    const newList = talkers.map((person) => (person.id === Number(id) ? body : person));
    fs.writeFile('talker.json', JSON.stringify(newList));
    return res.status(200).json(body).end();
  };
module.exports = editTalker;  