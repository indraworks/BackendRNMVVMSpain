
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import keys from '../config/keys.js'
import storage from '../utils/cloud_storage.js'
//register

export const register=(req,res)=> {
    const  user= req.body
    User.create(user,(err,data)=> {
      
        if(err){
            return res.status(501).json({
                success:false,
                message:'error on server pls check',
                error:err
            })
        }
        return res.status(201).json({
            success:true,
            message:'register done successfuly',
            data:data
        })
    })
}

//register with image
/*
jadi data adalah dari waktu kita register itu :
// aslinya liat dimodel hasil dari data adalah result yaitu :else {
              //      console.log('insert userId =',res.insertId)
                //    result(null,res.insertId)
                //yg merupakan res.insertId yatu id dari si user!
                //}
jadi user.id = data //mweakili res.inserId yg takl ian adala userId didatabase yg tercipta stlah 
register success!

*/

export const registerWithImage = async (req,res)=> {
    console.log(req.body)
    const user = JSON.parse(req.body.user) //seseion token yg mana user berisi 
                  //object dari req.body.user yg mama brbentuk object seseion_token (isinya)
                  console.log('user =',user)
    const files = req.files;
    if(files.length > 0) {
        const path = `image_${Date.now()}` //ini nama file kita 
        const url= await storage(files[0].path)
        if(url != undefined && url != null) {
            user.image = url
        }
    }

    User.create(user,(err,data)=> {
        if(err) {
            return res.status(501).json({
                success:false,
                message:'There was an error with the users registration ',
                error:err
            })
        }
        // aslinya liat di model/user.js hasil dari data adalah result yaitu :else {
              //      console.log('insert userId =',res.insertId)
                //    result(null,res.insertId)
                //yg merupakan res.insertId yatu id dari si user!
                //}
          user.id = `${data}`  
          const token = jwt.sign({id:user.id,email:user.email},keys.secretOfKey,{})
           user.session_token = token
           //habis ini kita update route kita ! menuju kesana ! 
          return res.status(201).json({
            success:true,
            message:'registration was successfull',
            data:user

          })  
    })
}






//login :(dibawah ini )
//utk dot findByEmail kita harus buat functionalnya di model/user.js
//jadi di mysqdl kalau mau buat functionalnya langsung pakai 
//namaTableScema.namaMySQlkita = ( masukan param yg dicari,resul)=>{}
//ingat di model/user.js =======> 
export const login =(req,res)=> {
   const {email,password} = req.body
    //check dgn findByEmail 
    // result(null,user[0]) //invocke callback fields dimasukan  nah user[0] itu value 
    //dari param myUser!

User.findByEmail(email,async(err,myUser)=>{
      console.log('Error ',err)
      console.log('User',myUser) //si user[0] ditampilkan 
      if(err) {
        return res.status(501).json({
            success:false,
            message:"There was an error with the user's registration",
            error:err
        })

      }
      if(!myUser) {
        return res.status(401).json({
            success:false,
            message:'The email was not found'
        })
      }
      const isPasswordValid = await bcrypt.compare(password,myUser.password) 
      if(isPasswordValid) {
         const token = jwt.sign({id:myUser.id,email:myUser.email},keys.secretOfKey,{})
         const data = {
            id:myUser.id,
            name:myUser.name,
            lastname:myUser.lastname,
            email:myUser.email,
            phone:myUser.phone,
            image:myUser.image,
            session:`JWT ${token}`,
         }
         return res.status(201).json({
            success:true,
            message:'the user was authenticated',
            data:data
         })
      } else {
        return res.status(401).json({
            success:false,
            message:'password wasa incorect!'
        })
      }
        

})


}

/*
penjelasan sesion pada saat sekali register :
adalah begini kita masuk pada sesion token dimana  data adalah 
Instead of returning the data that the data was the ID of the new user who registered.
jadi data itu adlaah id dari newUser yg liogin sbb kita tadi taruh token 
"In fact, I'm going to do it.

Well, from the error to the user I am going to add the ID telling him
 that it is equal to the data.

Pretty simple and instead of just returning their user ID,
 we are going to return the whole user,"


*/

/*
penjelasan callback function : 
1) ini model:User.findByEmail = (email, result) => {...}  ; //result disini adalah callback fucntion 
nah yg User.findbyEmail ini sama jadi  User.findByEMail( email, cb )=> {}
nah cb ini sprti ini :  async (err, myUser) => {
                           return {bla2 }}  



*/



/*
nah pada saatUser.create(user,(err,data)=> {})
//nah data dari user tadi kan dari req.body ya itu tadi yg difroentend berasal 
//dari repositories/AuthRepostory.tsx 
dimana  pada try {
               await ApiDelivery.post<ResponseAPIDelivery>('/users/create',user)
}                 //dimana user adalah: {id,name,lastname,email,phone,password }



*/