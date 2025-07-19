const express = require("express")
const index = express.Router()
const controller = require("../controller/controller")

index.get("/", controller.getloginPage)

index.post("/submit", controller.postloginreq)

index.get("/:username/:password/:userid", controller.DisplaymessageBoard)

index.get("/:userid/new" , controller.getnewmsg)

index.post("/:userid/new" , controller.postnewmsg)

index.get("/messages/:id" , controller.displaymessage)


module.exports = index;