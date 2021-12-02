const express = require('express');
const server = express();
server.use(express.json())

const welcomeRoute = require('./welcome');
const homeRoute = require('./home');
const travelRoute = require('./travel');

const middleware=function(req,res,next){
    const name=req.params.name
    const day=new Date();
    const currentday=day.toString() 
    console.log(`day=${currentday}`)
    console.log(`LOG:${req.originalUrl} called by ${name}`);
    next();
}

server.get("/sample/:name",middleware,function (req,res) {
    const name=req.params.name;
    res.send(`welcome ${name}`)
})
server.use(welcomeRoute);

server.use(homeRoute);

server.use('/travel',travelRoute);

server.post("/post",function (req,res) {
 res.json({
     name1:req.body.name,
     title:req.body.title
 })
})


server.listen(8000,function(){
console.log('server run successfull on 8000')
})