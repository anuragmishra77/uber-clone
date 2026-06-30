const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
       const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
       if(!token)
            return res.status(401).json({error: 'Access denied. No token provided.'});

       const blacklistedToken = await blacklistTokenModel.findOne({ token });
       if (blacklistedToken) {
            return res.status(401).json({error: 'Access denied. Token has been blacklisted.'});
       }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findById(decoded._id);
            if (!user) {
                return res.status(401).json({error: 'Access denied. Invalid token.'});
            }
            req.user = user;
            next();
        } catch (err) {
            return res.status(401).json({error: 'Access denied. Invalid token.'});
        }   
};

module.exports.authCaptain = async (req, res, next) => {
       const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
       if(!token)
            return res.status(401).json({error: 'Access denied. No token provided.'});

       const blacklistedToken = await blacklistTokenModel.findOne({ token });
       if (blacklistedToken) {
            return res.status(401).json({error: 'Access denied. Token has been blacklisted.'});
       }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const captain = await captainModel.findById(decoded._id);
            if (!captain) {
                return res.status(401).json({error: 'Access denied. Invalid token.'});
            }
            req.captain = captain;
            next();
        } catch (err) {
            return res.status(401).json({error: 'Access denied. Invalid token.'});
        }   
};