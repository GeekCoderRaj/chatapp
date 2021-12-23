const express = require('express');
const dotenv = require('dotenv');
const routes = require("./routes/routes");
const cors = require("cors");
var bodyParser = require('body-parser');
const connectDB = require('./config/db');
//Load env vars
dotenv.config({path: './config/config.env'});

//connect to database
connectDB();



const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

const logger = (req,res, next) => {
    console.log("Middleware begin");
    next();  
}
const errorHandler = (err,req,res, next) => {
    res.status(err.statusCode || 500).json({success: false, err: err.message || 'Server error'});
    next();  
}
app.use('/chat',logger,routes,errorHandler); 


const server = app.listen(PORT , console.log(`Server running at ${PORT}`));

process.on('unhandledRejection',(err,promise) => {
    console.log(`Error: ${err.message}`);
    server.close(()=> process.exit(1));
});