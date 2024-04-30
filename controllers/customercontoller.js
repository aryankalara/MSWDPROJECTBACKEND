const Customer = require("../models/Customer")
const Product = require("../models/Product")
const ProductCart = require("../models/ProductCart")
const ProductPurchase = require("../models/ProductPurchase")
const Recommend = require("../models/Recommend")
const path = require('path')
const fs = require('fs')

const checkcustomerlogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     const customer = await Customer.findOne(input)
     response.json(customer)
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };

 const insertcustomer = async (request, response) => {
  try 
  {
    const input = request.body;
    const customer = new Customer(input);
    await customer.save();
    response.status(200).send('Registered Successfully');
  } 
  catch(e) 
  {
    response.status(500).send(e.message);
  }
};

const recommendproduct = async (req, res) => {
  console.log("-----[[[[----")
  try {
    console.log("-----[[[[")
    const {  productname,fromemail,toemail, text } = req.body;
    console.log("-----")
    // Create a new Recommend document
    const newRecommend = new Recommend({ productname,fromemail,toemail, text });
    
    // Save the new Recommend document to the database
    const savedRecommend = await newRecommend.save();
    
    res.json(savedRecommend);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const viewrecommendations = async (request, response) => 
 {
    try 
    {
      const email = request.params.email
      console.log(email)
      const recommendations = await Recommend.find({"toemail":email});
      if(recommendations)
      {
        response.json(recommendations);
        console.log(recommendations)
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
 
 const customerprofile = async (request, response) => 
 {
    try
    {
      const email = request.params.email
      const customer = await Customer.findOne({email})
      if(customer)
      {
        response.json(customer)
      }
      else
      {
        return response.status(200).send('Customer not found with the provided email id');
      }
      
    }
    catch (error)
    {
      response.status(500).send(error.message);
    }
  };




 const updatecustomerprofile = async (request, response) => 
 {
   try 
   {
     const input = request.body;
     const email = input.email; 
     const customer = await Customer.findOne({ email });
     if (!customer) 
     {
       response.status(200).send('Customer not found with the provided email id');
     }
     for (const key in input) 
     {
       if (key !== 'email' && input[key]) {
        customer[key] = input[key];
       }
     }
     await customer.save();
     response.status(200).send('Customer Profile Updated Successfully');
   } 
   catch (e)
   {
     response.status(500).send(e.message);
   }
 };



 const viewcustomerproducts = async (req, res) => 
{
  try 
  {
    const products = await Product.find();
    res.status(200).json(products);
  }
  catch (error)
  {
    res.status(500).send(error.message);
  }
};

const productimage = async (req, res) => 
{
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../media', filename);
  console.log(filepath)

    fs.readFile(filepath, (err, data) => {
      if (err) 
      {
        console.error(err);
        return res.status(500).send('Error reading image file');
      }
     
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream'; // Default to octet-stream(Binary Data)

if (ext === '.png') {
  contentType = 'image/png';
} else if (ext === '.jpg' || ext === '.jpeg') {
  contentType = 'image/jpeg';
} else if (ext === '.pdf') {
  contentType = 'application/pdf';
} else if (ext === '.txt') {
  contentType = 'text/plain';
}

    res.setHeader('Content-Type', contentType);
      res.send(data);
    })
}




const getproductdetails = async (request, response) => 
   {
      try
      {
        const productid = request.params.productid
        const product = await Product.find({"productid":productid})
        response.json(product)
      }
      catch (error)
      {
        response.status(500).send(error.message);
      }
    };


    const getproductdetailspname = async (request, response) => 
   {
      try
      {
        const productname = request.params.productname
        console.log(productname)
        const product = await Product.find({"productname":productname})
        response.json(product)
      }
      catch (error)
      {
        response.status(500).send(error.message);
      }
    };



  const addtocart = async (request, response) => 
  {
    try
    {
      const input = request.body; 
      const alreadyadded = await ProductCart.findOne(input)
      console.log(alreadyadded)
      if(!alreadyadded)
      {
        const productbuyer = new ProductCart(input);
         productbuyer.addtocartStatus="addedtocart"
        await productbuyer.save();
        response.status(200).send('Product Added to cart');
      }
      else
      {
        response.status(200).send('You have already added this product to cart ');
      }
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };


  const productpurchase = async (request, response) => 
  {
    try
    {
      const input = request.body; 
      const alreadpurchased = await ProductPurchase.findOne(input)
      console.log(alreadpurchased)
      if(!alreadpurchased)
      {
        const productbuyer = new ProductPurchase(input);
         productbuyer.purchaseStatus="purchased"
         productbuyer.count=1
        await productbuyer.save();
        response.status(200).send('Order Placed');
      }
      else
      {
        response.status(200).send('You have already purchased this product  ');
      }
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };


  

const getaddedtocart = async (request, response) => 
{
  try 
  {
      const email = request.params.email;
      const products = await ProductCart.find({ "customeremail": email , "addtocartStatus" :"addedtocart" });

        const productIds = products.map(product => product.productid);

        const cartproducts = await Product.find({ productid: { $in: productIds } });

          response.json(cartproducts);
        
      
  } 
  catch (error) 
  {
      response.status(500).send(error.message);
  }
};


const getpurchased = async (request, response) => 
{
  try 
  {
      const email = request.params.email;
      const products = await ProductPurchase.find({ "customeremail": email , "purchaseStatus" :"purchased" });

        const productIds = products.map(product => product.productid);

        const purchasedproducts = await Product.find({ productid: { $in: productIds } });

          response.json(purchasedproducts);
        
      
  } 
  catch (error) 
  {
      response.status(500).send(error.message);
  }
};

  const getcartstatus = async (request, response) => 
  {
    try
    {
      const input = request.body; 
      const { productid, customeremail } = request.body; 
      console.log(customeremail+"9999999")
      const alreadyapplied = await ProductCart.findOne(input)
      console.log(alreadyapplied)
      if(!alreadyapplied)
      {
        response.status(200).send('Add to cart');
      }
      else
      {
        response.status(200).send('Added to cart');
      }
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
};


const getpurchasecount = async (request, response) => 
{
  try
  {
    const input = request.body; 
    const { productid, customeremail } = request.body; 
    console.log(customeremail+"[[[")
    const alreadyapplied = await ProductPurchase.findOne(input)
    console.log(alreadyapplied)
    if(!alreadyapplied)
    {
      response.status(200).send(alreadyapplied.count);
    }
    else
    {
      response.status(200).send('Not Found');
    }
  } 
  catch(e) 
  {
    response.status(500).send(e.message);
  }
};


const removefromcart = async (request, response) => 
{
   try
   {
     const productid = request.params.productid;
     const customeremail = request.params.customeremail;

     const product = await ProductCart.findOne({ "productid" : productid , "customeremail": customeremail })
     
     if(product!=null)
     {
       await ProductCart.deleteOne({ "productid" : productid , "customeremail": customeremail })
       response.status(200).send("Product removed from Cart")
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

 module.exports = {checkcustomerlogin,insertcustomer,recommendproduct,viewrecommendations,customerprofile,updatecustomerprofile,viewcustomerproducts,productimage,getproductdetails,getproductdetailspname,addtocart,productpurchase,getcartstatus,getaddedtocart,getpurchased,getpurchasecount,removefromcart}