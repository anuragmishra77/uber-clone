const captainModel = require('../models/captain.model');

const captainServices = {
    create: async (captainData) => {
        return await captainModel.create(captainData);
    }
};

module.exports = captainServices;