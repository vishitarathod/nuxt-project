import express from 'express';
import http from 'http';
import cors from 'cors';
import router from './router/router.js'
import './config/db.js'
const app=express();



//create server
const httpServer = http.createServer(app);

//use cors as middleware
app.use(cors());
app.use(express.json())

//routes
app.use('/',router)

//server listen below port number
httpServer.listen(4000,()=>{
    console.log('server running on 4000')
});