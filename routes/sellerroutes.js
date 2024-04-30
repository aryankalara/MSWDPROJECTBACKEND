
const sellercontroller = require("../controllers/sellercontroller")

const express = require("express")
const sellerrouter  = express.Router()

sellerrouter.post("/checksellerlogin",sellercontroller.checksellerlogin)
sellerrouter.put("/updateproductdetails",sellercontroller.updateproductdetails)
sellerrouter.post("/insertproduct",sellercontroller.insertproduct)
sellerrouter.get("/viewsellerproducts/:semail",sellercontroller.viewsellerproducts)

sellerrouter.put("/updatesellerprofile",sellercontroller.updatesellerprofile)
sellerrouter.get("/sellerprofile/:email",sellercontroller.sellerprofile)
sellerrouter.get("/addedtocartcount/:pid",sellercontroller.addedtocartcount)
sellerrouter.get("/purchasedcount/:pid",sellercontroller.purchasedcount)
sellerrouter.delete("/deletesellerproduct/:productid/:selleremail",sellercontroller.deletesellerproduct)


module.exports = sellerrouter