const express = require("express");
const teacherRoute = require("./Route/teacherRoute");
const childRoute = require("./Route/childRouter");
const classRoute = require("./Route/classRouter");
const authRoute = require("./Route/authorizationRoute");
const upload = require("./multer");
const mongoose = require("mongoose");
const specs = require('./swagger');
const port = process.env.PORT || 8080;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(port, function () {
    console.log(`server is listening to port: ${port}`)
})

mongoose.connect("mongodb://localhost:27017/NurseyDB")
    .then(()=>{
        console.log("database connected succesfully....");
    })
    .catch((error)=>{
        console.log("connection problem " + error);
    })

specs(server,port);


//-------------- settings ----------------
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(upload.single("image"));

//-------------- routes ----------------
server.use(authRoute);
console.log("111111111");
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);

//-------------- not found ----------------
server.use((request,response) =>{
    console.log("NotFound");
    response.status(404).json({message : "Not Found"})
});

//-------------- error ----------------
server.use((error ,request,response,next) =>{
    let status = error.status || 500;
    response.status(status).json({message :error.message +""});
});
