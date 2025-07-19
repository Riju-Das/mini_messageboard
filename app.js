const express = require("express")
const app = express()
const index = require("./routers/index.js")
const path = require("path")

app.use(express.urlencoded({ extended: true }));

app.set("views" , path.join(__dirname, "views"))
app.set("view engine" , "ejs")

const assetpath = path.join(__dirname, "public")
app.use(express.static(assetpath))

app.use("/" ,index);

app.listen(3000, ()=>{
    console.log("The app is listening to port number 3000")
})