const express= require("express")
const mongoogse = require("mongoose")
const cros = require("cors")
//cros - Cross-Origin Resource Sharing 
//require('dotenv').config();

//MongoDB Atlas connection

const dburl ="mongodb+srv://admin:admin@cluster1.ajqt9ly.mongodb.net/ecommercedbteam03"
//connection step
//db - demoproject32
mongoogse.connect(dburl).then(()=>
{
    console.log("Connected to MongoDB Atlas Successfully")
}).catch((err)=>
{
    console.log(err.message)
});



//connection step//db - demoproject32
//const dburl = process.env.mongodburl


// const dburl ="mongodb://localhost:27017/ECommerceProject"

// mongoogse.connect(dburl).then(()=>
// {
//     console.log("Connected to DB Sucessfully")
// }).catch((err)=>
// {
//     console.log(err.message)
// });



const app = express()
app.use(express.json()) //to parse JSON data
app.use(cros())
const adminrouter = require("./routes/adminroutes")
const sellerrouter = require("./routes/sellerroutes")
const customerrouter = require("./routes/customerroutes")

app.use("",adminrouter)
app.use("",sellerrouter)
app.use("",customerrouter)

const port =2032
//const port = process.env.PORT || 2032
app.listen(port,()=>
{
    console.log("server is running at port: "+port)
})
