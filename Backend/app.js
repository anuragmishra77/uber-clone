const express = require('express');
 const dotenv = require('dotenv');
const app = express();
const cors = require('cors');

dotenv.config();

app.use(cors());

app.get('/' ,(req , res) =>{

    res.send('hello');

});

module.exports = app;