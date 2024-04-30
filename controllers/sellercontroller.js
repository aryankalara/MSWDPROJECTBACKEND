const Product = require("../models/Product")
const Seller = require("../models/Seller")
const ProductCart = require("../models/ProductCart")
const ProductPurchase = require("../models/ProductPurchase")
const multer = require('multer')

const checksellerlogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     const seller = await Seller.findOne(input)
     response.json(seller)
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };





 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './media/'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // File naming convention
  }
});

const upload = multer({ storage: storage }).single('file');


const insertproduct =async (req, res)=> {

  try 
  {
    upload(req, res, async function (err) 
    {
      if (err) 
      {
        console.error(err);
        return res.status(500).send(err.message);
      }

      const { companyname,productname,category,description,
        prevprice,newprice,seller,comparisionlink1,comparisionlink2} = req.body;
      const fileName = req.file ? req.file.filename : undefined; // Extracting file name

      const product = new Product({
        companyname,
        productname,
        category,
        description,
        prevprice,
        newprice,
        comparisionlink1,
        comparisionlink2,
        seller,
        file:fileName
      });

      await product.save();
      res.status(200).send('Product added Successfully');
    });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const updateproductdetails = async (request, response) => 
{
  try 
  {
    const input= request.body;
    const pid = request.body.productid; 

    const product = await Product.findOne({ pid });
    if (!product)
    {
      response.status(200).send('product not found with the provided email id');
    }
      for (const key in input) 
     {
       if (key !== 'email' && input[key]) {
        product[key] = input[key];
       }
     }
     
    await product.save();
    response.status(200).send('product Profile Updated Successfully');
  }
  catch (e)
  {
    response.status(500).send(e.message);
  }
};








const sellerprofile = async (request, response) => 
{
   try
   {
     const email = request.params.email
     const seller = await Seller.findOne({email})
     if(seller)
     {
       response.json(seller)
     }
     else
     {
       return response.status(200).send('Seller not found with the provided email id');
     }
     
   }
   catch (error)
   {
     response.status(500).send(error.message);
   }
 };

const updatesellerprofile = async (request, response) => 
{
  try 
  {
    const input = request.body;
    const email = input.email;
    const seller = await Seller.findOne({ email });
    if (!seller) 
    {
      response.status(200).send('Seller not found with the provided email id');
    }
    for (const key in input) 
    {
      if (key !== 'email' && input[key]) {
       seller[key] = input[key];
      }
    }
    await seller.save();
    response.status(200).send('Seller Profile Updated Successfully');
  } 
  catch (e)
  {
    response.status(500).send(e.message);
  }
};







const viewsellerproducts = async (request, response) => 
 {
    try 
    {
      const semail = request.params.semail
      const products = await Product.find({"seller":semail});
      if(products)
      {
        response.json(products);
      }
      else
      {
        response.status(200).send("DATA NOT FOUND");
      }
    }
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  
const deletesellerproduct = async (request, response) => 
{
   try
   {
     const productid = request.params.productid;
     const selleremail = request.params.selleremail;

     const product = await Product.findOne({ "productid" : productid , "seller": selleremail })
     
     if(product!=null)
     {
       await Product.deleteOne({ "productid" : productid , "seller": selleremail })
       response.status(200).send("Product Deleted")
     }
     else
     {
       response.status(200).send("Data Not Found")
     }

   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };


 
  const addedtocartcount = async (req, res) => {
    try 
    {
        const productid = req.params.pid
        const addedcount = await ProductCart.countDocuments({ productid: productid });
        res.json({addedcount});
      } 
      catch (error) 
      {
          res.status(500).send(error.message);
      }
    };
    

const purchasedcount = async (req, res) => {
  try 
  {
      const productid = req.params.pid
      const purchasedcount = await ProductPurchase.countDocuments({ productid: productid });
      res.json({purchasedcount});
    } 
    catch (error) 
    {
        res.status(500).send(error.message);
    }
  };
      


module.exports = {insertproduct,checksellerlogin,viewsellerproducts,updateproductdetails,sellerprofile,updatesellerprofile,addedtocartcount,purchasedcount,deletesellerproduct}
