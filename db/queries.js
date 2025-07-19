const pool = require("./pool")

async function createNewUser(username,password){
    await pool.query(`INSERT INTO users(username,password) SELECT $1::VARCHAR, $2::VARCHAR WHERE NOT EXISTS(SELECT 1 FROM users WHERE username = $1::VARCHAR AND password = $2::VARCHAR)`, [username,password])
}   

async function fetchuserid(username,password){
    const { rows } = await pool.query(`SELECT id FROM users WHERE username = $1 AND password = $2`, [username,password])
    return rows[0].id
}

async function displaymessages(userid){
    const { rows } = await pool.query(`SELECT id,message FROM messages WHERE user_id = $1`, [userid])
    return rows.map((row)=>({id:row.id , message: row.message}))
}

async function displaysinglemessage(messageid) {
    const { rows } = await pool.query(`SELECT message FROM messages WHERE id = $1`, [messageid])
    return rows[0].message || null
}
async function gobackurl(userid){
    const { rows } = await pool.query(`SELECT username, password FROM users WHERE id = $1`, [userid])
    return rows.length>0? {username: rows[0].username , password: rows[0].password}: null ;
}

async function addmessage(userid,message){
    await pool.query(`INSERT INTO messages(user_id,message) VALUES ($1 ,$2)`,[userid, message])
}
module.exports=  {
    createNewUser,
    fetchuserid,
    displaymessages,
    displaysinglemessage,
    gobackurl,
    addmessage
}