const admincontroller = require("../controllers/admincontroller")

const express = require("express")
const adminrouter  = express.Router()

adminrouter.post("/checkadminlogin",admincontroller.checkadminlogin)
adminrouter.delete("/deletecustomer/:email",admincontroller.deletecustomer)
adminrouter.get("/viewcustomers",admincontroller.viewcustomers)
adminrouter.get("/viewsellers",admincontroller.viewsellers)
adminrouter.delete("/deleteseller/:email",admincontroller.deleteseller)
adminrouter.post("/addseller",admincontroller.addSeller)


module.exports = adminrouter