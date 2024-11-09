import express from 'express'
import dotenv from 'dotenv'
import dbconnection from './utils/databaseConnection.js';
import cors from 'cors'
import { errormiddleware } from './utils/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import isauthenticated from './middlewares/Authentication.middleware.js';
import {login, makeadmin} from './controllers/loginController.js';

import adminroutes from './routes/admin.route.js';
import smroutes from './routes/sm.route.js';
import hrroutes from './routes/hr.route.js';



dotenv.config();

//connection to database
dbconnection().then(()=>{
  app.listen(8000, (error)=>{
    if (error) console.log(error);
  
    console.log("my server is running!")
  })
});


const app = express();



//middlewares

app.use(express.json());
app.use(express.urlencoded({extended: false})); 
app.use(cookieParser()); //used for  reading cookie present in request


app.use(cors({
    origin: function (origin, callback) {
      // Allow all origins
      callback(null, true);  // 'true' allows all origins
    },
    credentials: true, // Allow cookies to be sent
  }))



app.get('/',(req,res)=>{
    res.send("Hi EveryOne");
})


app.post('/api/auth/login',login);
app.post('/api/auth/makeadmin',makeadmin);

app.use(isauthenticated);//after this all rotes have access of req.user


//routes
app.use('/api/auth/admin',adminroutes);
app.use('/api/auth/sm',smroutes);
app.use('/api/auth/hr',hrroutes);




app.use(errormiddleware);



