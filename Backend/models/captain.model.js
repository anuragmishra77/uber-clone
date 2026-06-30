const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long']     
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email'],
        minlength: [5, 'Email must be at least 5 characters long']

    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'unavailable'
    },
    vehicle: {
        color: {
            type: String,
            required: true
        },
        licensePlate: {
            type: String,
            required: true ,
            minlength: [1, 'License plate must be at least 1 character long'] 
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1']
        },
        type: {
            type: String,
            required: true,
            enum: ['car', 'auto', 'bike']
        }
    },
    location: {
        latitude: {
            type: Number,
            
        },
        longitude: {
            type: Number,
            
        }
    }
});

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:  this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password , this.password);      
}

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password , 10);    
}

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;


