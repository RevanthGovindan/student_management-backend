const { v4: uuidv4 } = require('uuid');

export const getUUID = () => {
    var your_uuid = uuidv4();

    your_uuid = your_uuid.split('-').join('')

    return your_uuid;
}
getUUID();