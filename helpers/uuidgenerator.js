const { v4: uuidv4 } = require('uuid');
var your_uuid = uuidv4();

your_uuid = your_uuid.split('-').join('')

console.log(your_uuid);