const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '..', 'talker.json');

const talker = async () => {
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    return data;
};

module.exports = talker;