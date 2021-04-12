const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/getOutlet', require('./routes/outlet'));


mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, () =>{
    console.log('connected to DBBBB!!');
})

//listen to server
app.listen(8081)