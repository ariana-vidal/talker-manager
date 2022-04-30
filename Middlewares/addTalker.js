const fs = require('fs').promises;

const getTalker = () => fs.readFile('./talker.json', 'utf-8')
    .then((fileContent) => JSON.parse(fileContent));

const setTalker = async (newT) => fs.writeFile('./talker.json', JSON.stringify(newT, null, 2));

module.exports = { getTalker, setTalker };
