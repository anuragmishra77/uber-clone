const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const cookieParser = require('cookie-parser');

app.use(cookieParser());        

dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/' ,(req , res) =>{

    res.send('hello');

});
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;