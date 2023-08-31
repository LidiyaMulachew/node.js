const http= require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);



/*const express = require("express");
const mongoose = require("mongoose");
const api = express();
const url = "mongodb+srv://E-commerce:deliveryboy@cluster0.9h59ya4.mongodb.net/E-commerce?retryWrites=true&w=majority'"
async function connect(){
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    }
    catch(error) {
        console.error(error);
    }
}
connect();

app.listen(3000, () => {
    console.log("server started on port 3000");
});*/