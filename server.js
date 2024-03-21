const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

const allowedOrigins = ['http://localhost:3000', 'http://192.168.0.146:3000'];

app.use(cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

mongoose.connect(process.env.MONGO_URI).then((conn)=>{

    console.log('Connected to DB: ' + conn.connection.host);
    app.listen(process.env.PORT, ()=>{
        console.log(`Server running on: ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log('Connection Failed: ' + error);
});


//middleware to parse the request body 
app.use(express.json());  

// Middleware to parse form-data
app.use(express.urlencoded({extended:true}));
 
//handling routes
app.use('/sime/api', require('./routes/main'))      
app.use('/sime/api', require('./routes/user'))      