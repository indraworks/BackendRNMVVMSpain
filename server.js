import express from 'express'
import http from 'http'
import logger from 'morgan'
import cors from 'cors'
import passport from 'passport'
import passportConfig from './config/passport.js'
import userRoutes from './routes/userRoutes.js'
import multer from 'multer'


const app = express()
const server = http.createServer(app)




//use 
app.use(cors())
app.use(logger('dev'))


//middleware
app.use(express.json()) //req.bopdy
app.use(express.urlencoded({extended:true})) //utk object
app.disable('x-powered-by')
//passport
app.use(passport.initialize())
app.use(passport.session())
passportConfig(passport)




const port = process.env.PORT || 5000
app.set('port',port)

//upload kita pindah di userROutes aja 
// const upload = multer({
//     storage:multer.memoryStorage()
// })

//Error handler utk semua di middleware 
app.use((err,req,res,next)=>{
   console.log(err)
   res.status(err.status || 3000).send(err.stack)
})

//router


app.use("/api/users",userRoutes)

//routimg awal 
app.get("/",(req,res)=>{
    res.send("route utama  / on thebackend")
})





server.listen(5000,()=>console.log(`application run on port ${port}`))
/*
kalau ada error Login sessions require session support. Did you forget to use `express-session` middleware?
turuni dari passport 0.7 atau 0.9 ke 0.4 

*/



/*
kita pakai pasportjs dan paspost jwt kita gunakana di server dgn pemakaian 
app.use utk smua yg dipkai 
The passport module is initialized and configured using passportConfig(passport).
The application setup remains the same, with middleware and settings applied to the app instance.
jadi dari 
require('./config/passport')(passport);
kita ubah ke modile js jadi begini :
import passportConfig from './config/passport.js';
passportConfig(passport);
*/


/*

Express provides you with middleware to deal with the (incoming) data (object) in the body of the request.

a. express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. 
This method is called as a middleware in your application using the code: app.use(express.json());

b. express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays.
 This method is called as a middleware in your application using the code: app.use(express.urlencoded());


*/

