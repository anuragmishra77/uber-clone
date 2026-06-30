const userModel = require('../models/user.model');
const userServices = require('../services/user.services');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req , res , next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json( {errors: errors.array()} );

const {fullname, email  , password} = req.body;
   console.log(req.body);
const hashedPassword = await userModel.hashPassword(password);

const user = await userServices.createUser({
     firstname : fullname.firstname,
     lastname: fullname.lastname,
     email,
     password : hashedPassword
});


const token = user.generateAuthToken();

res.status(201).json({token, user});
}

module.exports.loginUser = async (req , res , next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json( {errors: errors.array()} );

    const {email , password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user)
        return res.status(401).json({error: 'Invalid email or password'});

    const isMatch = await user.comparePassword(password, user.password);

    if(!isMatch)
        return res.status(400).json({error: 'Invalid email or password'});

    const token = user.generateAuthToken();
    res.cookie('token', token, { httpOnly: true });

    res.json({token, user});
}

module.exports.getUserProfile = async (req , res , next) => {

    const user = req.user;    
    res.status(200).json({user});       
} 

module.exports.logoutUser = async (req , res , next) => {
    const token = req.cookies.token;        
    await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}       