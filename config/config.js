import mysql from 'mysql'

//connection pool
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'brezn3v_2005',
    database:'udemy_delivery'
})

pool.getConnection((err,connection)=> {
    if(err) {
        console.error('Error conecting to database',err)
        return
    }
    console.log('DATABASE connected!')
    connection.release()
})
export default pool