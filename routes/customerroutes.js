
const customercontroller = require("../controllers/customercontoller")

const express = require("express")
const customerrouter  = express.Router()


customerrouter.post("/checkcustomerlogin",customercontroller.checkcustomerlogin)
customerrouter.post("/insertcustomer",customercontroller.insertcustomer)
customerrouter.post("/recommendproduct",customercontroller.recommendproduct)
customerrouter.get("/viewrecommendations/:email",customercontroller.viewrecommendations)


customerrouter.put("/updatecustomerprofile",customercontroller.updatecustomerprofile)
customerrouter.get("/customerprofile/:email",customercontroller.customerprofile)
customerrouter.get("/viewcustomerproducts",customercontroller.viewcustomerproducts)
customerrouter.get("/productimage/:filename",customercontroller.productimage)
customerrouter.get("/getproductdetails/:productid",customercontroller.getproductdetails)
customerrouter.get("/getproductdetailspname/:productname",customercontroller.getproductdetailspname)
customerrouter.post("/addtocart",customercontroller.addtocart)
customerrouter.post("/productpurchase",customercontroller.productpurchase)
customerrouter.get("/getaddedtocart/:email",customercontroller.getaddedtocart)
customerrouter.get("/getpurchased/:email",customercontroller.getpurchased)
customerrouter.post("/getpurchasecount",customercontroller.getpurchasecount)
customerrouter.post("/getcartstatus",customercontroller.getcartstatus)
customerrouter.delete("/removefromcart/:productid/:customeremail",customercontroller.removefromcart)




module.exports = customerrouter