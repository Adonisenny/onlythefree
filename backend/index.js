import  express  from "express"; 
import dotenv from 'dotenv'
import path from "path";

import mongoose from "mongoose";
import cors from 'cors'
import authrouter from './routes/authroutes.js'
import multer from 'multer'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import rumorrouter from './routes/rumorroutes.js';
import messagerouter from './routes/directMessageroutes.js';
import conversationrouter from './routes/conversationRoutes.js'
import { Server } from "socket.io";
import http from 'http'
import commentrouter from './routes/commentRoutes.js';
import profilerouter from './routes/profileRoutes.js';
import likesrouter from './routes/likesroutes.js';
import commentcommentrouter from './routes/commentcommentroutes.js';

 // express app
const app = express()

const server =http.createServer(app)
const io = new Server(server,{
  
})
app.use(cors({
     origin:["https://onlythefree.onrender.com"],   //"https://testingrumors.onrender.com"
   
    methods:"GET,POST,PUT,DELETE",
    allowedHeaders:"Content-Type,Authorization",
    credentials:true,
}))
const upload = multer({dest:'uploads/'})
dotenv.config()

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/uploads',express.static('uploads'))


//middlewares
 app.use(express.json())
 
app.use((req,res,next)=> {
    
    next()
})

app.use('/api/rumors',rumorrouter)
app.use('/api/auth',authrouter)
app.use('/api/directmessages',messagerouter)
app.use('/api/conversation',conversationrouter)
app.use('/api/comments',commentrouter)

app.use('/api/commentcomment',commentcommentrouter)
 app.use('api/profile',profilerouter)
 app.use('/api/profile',upload.single('image'),profilerouter)
app.use('/api/likes', likesrouter)
app.use('/api/profile/likes', likesrouter)
//Routes
app.get("/", (req,res,next)=>{
    res.json("the workout page1")
})


const buildPath = path.join(process.cwd(), 'client', 'build');
  // Define a catch-all route that serves index.html for all routes
app.use(express.static(buildPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
  //Error handling
  app.use((err,req,res)=> {
    res.status(err.status || 500).json({error:err.message})
  })

mongoose.connect(process.env.MONGO)
.then(() => {
    if(process.env.PORT){
    app.listen(process.env.PORT, (req,res,next)=> {
        console.log("connected to db")
    
        })
    }
})
.catch((error) => {
    console.log(error)
})
