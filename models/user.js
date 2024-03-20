import db from '../config/config.js'
import bcrypt from 'bcryptjs'
const User = {}

//kalau field yg diinsertkan di mysql adalah tanda pakai ? 
// iut param yg di pasing mirip param di compoentn ah tapi penanndanya adalah ? 
//nah dari useControllers.tsx pada code :
// const user = req.body yg isinya {id,name,lastname,email,phone,password } masuk sini !
//utk asynchronus di javascript result arg itu adalah sbuah cb functuon /calback fuinction udah lazin di javascript!
User.create = async (user,result)=> {
  const hash = await bcrypt.hash(user.password,10)
  //nnti yg hasil hash ini dimasukah difield passowrd 
    const sql =`
      INSERT INTO 
           users(
            email,
            name,
            lastname,
            phone,
            image,
            password,
            created_at,
            update_at
           )
           VALUE(?,?,?,?,?,?,?,?)
    
    `;

    db.query(   
          sql,[
                user.email,
                user.name,
                user.lastname,
                user.phone,
                user.image,
                hash,
                new Date(), //masukan date ke created_at field
                new Date() //sama kyk diatas
              ],(err,res)=> {
                if(err){
                    console.log('Error',err)
                    result(err,null) //ini inveke calback function di userControllers/user.js
                } else {
                    console.log('insert userId =',res.insertId)
                    result(null,res.insertId)

                }
              }


    )
} 

//utk login kita ktambahan findById dan findByEmaal jika nemu maka ...
//ini dot finfById ini nama function ya utk sql kita kalau kita mysql-nodejs!
//jadi biar paham bukan bawaan layaknya di mongodb karena ini adalah 
//object variable nama yg mana  isinya adalah stlah tanda "=" 
//nah functional mysqlnya ya itu ada function(param,hasilresult)=>{isi}
/*
nah ,isi ada 3 part 
sql=``
db.query(sql,[param],(err,result)=>{ if error else if result})

*/
User.findById = (id,result)=> {
  const sql= `
  SELECT
       id,
       name,
       lastname,
       image,
       password
   FROM
       users
   WHERE
       id = ?       
    `;
   db.query(
    sql,[id],(err,user)=>{
       if(err) {
        console.log('Error',err)
        result(err,null)
       }
       else {
        console.log('User yg dipilih :',user[0])
        result(null,user[0])
       }

    }

    
   ) 
}

User.findByEmail = (email,result)=>{
  const sql = `
         SELECT
              id,
              name,
              lastname,
              image,
              password
         FROM
             users
         WHERE
              email= ?         
  `;
   db.query(
    sql,[email],
    (err,user)=>{
      if(err){
          console.log('Error',err)
          result(err,null) // manggil calback function di controler
                          //di invoke 
      } else {
          console.log('result hasil field ',user[0])
          result(null,user[0]) //invocke callback fields dimasukan 
      }
    }
   )  
}

export default User;

/* Pakem Jalanya biar tak bingung 1 aja contoh! 
jalannya values dari Presentation aja ya ! dari RegisterScreen logic diolah oleh si register 
nah ini masuk values berupa obejct isinya {id,name,lastname,email,phone.passsword}
diREgistetrScreen.tsx  ktika buton diklik 
 <RoundedButton text='CONFIRMATION' 
                    onPress={ () => register() } />
begitu diclikc viewmodeljalan 
jalankan  const response = await RegisterAuthUseCase(values) ---> ini dari Domain USeCase
                            note is values tadi : {id,name,lastname,email,phone.passsword}
---->X kita kesampingkan response dpt jhawabn kita liat proses nya dari front --<ke backenbd
-----> nah lwath sini domain/useCase ---->
      diuseCase ingat itu 
      const RegisterAuthUseCase = async (user:User)=> { //ingat user tadi sama kontrak hrus sama dgn entits (domain( User!))
    return await register(user)

    dimana aslinay si register tadi adalah instance object dari AuthRepositoryImpl
    const {register} = new AuthRepositoryImpl();

---->dari domain kita keData --->    disini ada 2 respinsenya  yg berisi  {success:boolean,messageLstring,data:?any,error:any}
                                                     lihat X diatas 
     nah trus aja ya kita fokus ke tadi data/repositories 
     nah disini dia data kita taid values tadi masuk parameter namayan user nah di data repositories tadi 
     kita masih ingat ini adalah transaksi si domain dgn data ( lewat user:User (iterfacekontrak))   
                                            dan data dgn node/mysql lewat -->response yg nnti diaterima
                                                                         -->masukan user dati lewat api 
                                                                           (data/source/api utk aderess alama si node)                                                
     nah ini dia dibawah kode try 

     xport class AuthRepositoryImpl implements AuthRepository {
  async  register(user: User): Promise<ResponseAPiDelivery> {
         
        try {
            const response = await ApiDelivery.post<ResponseAPiDelivery>('/users/create',user)
              //nah user tadi itulah field2 yg dari represntation sampai sini ! nah masuk ke 
              //backend ke route http:192.168.1.3:3000/api/users/create 
            
            return Promise.resolve(response.data)
            
        } catch (error) {
            let e =(error as AxiosError)
             console.log('ERR :OR'+JSON.stringify(e.response?.data))
             const apiError :ResponseAPiDelivery =
             JSON.parse(JSON.stringify(e.response?.data))
             return Promise.resolve(apiError)
        }
    }

}



nah dibawah ini  yg sql itu nnti coba liat di userController saya terangkan sambunganya 
ygdiregister aja liat ya!?





*/





/*
 rumusnya akan selalu sama kalau pakai mysql
 const var = (param1,cb)=> {
      const sql =``; //berisi sqlnya dgn nnti ada variable param_field masuk dikasih ?
      db.query(sql,[param_field],(err,result)=> {
        if(err) {
              
        }else {

        }
      })
 }



*/
