const express=require('express');
const server= express();
const port= 2020;

const router= express.Router();//
const routes= require('./routes');

const bodyParser= require("body-parser");
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

server.use((req, res, next)=>{
    console.log(req.method,req.ip, req.path);
    next();
})

server.use('/',routes);


server.listen(port,()=>{
    console.log("Server started at port ", port);
});