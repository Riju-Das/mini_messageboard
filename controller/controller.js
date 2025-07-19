const db = require("../db/queries")

function getloginPage(req,res){
    res.render("login")
}

async function postloginreq(req,res){
    const { username, password } = req.body
    await db.createNewUser(username,password)
    const userid = await db.fetchuserid(username,password)
    res.redirect(`/${username}/${password}/${userid}`)
}

async function DisplaymessageBoard(req,res){
    const { username , password , userid } = req.params
    const messages = await db.displaymessages(userid)
    res.render("index" , {title:"Mini Messageboard" , messages,username,password , userid})
}

async function displaymessage(req,res){
    const messageid = req.params.id
    const userid = req.query.userid
    const message = await db.displaysinglemessage(messageid)
    const {username , password} = await db.gobackurl(userid)
    res.render("messageinfo", {message,userid,username,password})
    
}
async function getnewmsg(req,res){
    const userid = req.params.userid
    const {username , password} = await db.gobackurl(userid)   
    res.render("forms", {userid,username,password})
}
async function postnewmsg(req,res){
    const userid = req.params.userid
    const { message } = req.body
    await db.addmessage(userid , message)
    const {username , password} = await db.gobackurl(userid)  
    res.redirect(`/${username}/${password}/${userid}`)
}


module.exports= {
    getloginPage,
    postloginreq,
    DisplaymessageBoard,
    displaymessage,
    getnewmsg,
    postnewmsg
}