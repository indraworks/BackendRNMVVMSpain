import express from "express";
import multer from "multer";

const router = express.Router()
const upload = multer({
    storage:multer.memoryStorage()
})


import { register,login, registerWithImage} from '../controllers/userControllers.js'



    router.post("/create",register)
    //kita pisahkan yg upload 
    router.post("/create-with-image",upload.array('image',1),registerWithImage)
    
    router.post("/login",login)
   

export default router;



/*
note:setelah kita buat  ke domain  repository utk buat fucntion abstractnya 



*/

