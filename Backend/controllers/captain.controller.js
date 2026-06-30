const {validationResult} = require('express-validator');
const captainmodel = require('../models/captain.model');
const captainServices = require('../services/captain.services');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req , res , next) => {

   
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json( {errors: errors.array()} );

    const {fullname, email  , password, vehicle} = req.body;
    console.log(req.body);
    const isCaptainExists = await captainmodel.findOne({ email });  
    if (isCaptainExists) {
        return res.status(400).json({ error: 'Captain with this email already exists' });
    }
    const hashedPassword = await captainmodel.hashPassword(password);


     const captain = await captainServices.create({
    fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname
    },
    email,
    password: hashedPassword,
    vehicle: {
        color: vehicle.color,
        licensePlate: vehicle.licensePlate,
        capacity: vehicle.capacity,
        type: vehicle.type
    }
});
    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
    
};

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const captain = await captainmodel.findOne({ email }).select('+password');

    if (!captain)
        return res.status(401).json({ error: 'Invalid email or password' });

    const isMatch = await captain.comparePassword(password, captain.password);
    if (!isMatch)
        return res.status(400).json({ error: 'Invalid email or password' });

    const token = captain.generateAuthToken();
    res.cookie('token', token, { httpOnly: true });

    res.json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res, next) => {
    const captain = req.captain;
    res.status(200).json({ captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token;
    await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};
