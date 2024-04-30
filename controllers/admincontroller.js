const Admin = require("../models/Admin")
const Customers = require("../models/Customer")
const Sellers = require("../models/Seller")

const checkadminlogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     const admin = await Admin.findOne(input)
     response.json(admin)
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };

 const viewcustomers = async (request, response) => 
 {
    try 
    {
      const customers = await Customers.find();
      if(customers.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(customers);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
  const viewsellers = async (request, response) => 
 {
    try 
    {
      const sellers = await Sellers.find();
      if(sellers.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(sellers);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const deletecustomer = async (request, response) => 
  {
     try 
     {
       const email = request.params.email
       const customers = await Customers.findOne({"email":email})
       if(customers!=null)
       {
         await Customers.deleteOne({"email":email})
         response.send("Deleted Successfully")
       }
       else
       {
         response.send("Email ID Not Found")
       }
 
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const deleteseller = async (request, response) => 
  {
     try 
     {
       const email = request.params.email
       const sellers = await Sellers.findOne({"email":email})
       if(sellers!=null)
       {
         await Sellers.deleteOne({"email":email})
         response.send("Deleted Successfully")
       }
       else
       {
         response.send("Email ID Not Found")
       }
 
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const addSeller = async (request, response) => {
    // try {
    //   const sellerData = request.body;
  
    //   const newSeller = new Sellers(sellerData);
  
    //   await newSeller.save();
  
    //   response.status(201).json({ message: "Seller added successfully.", seller: newSeller });
    // } catch (error) {
    //   response.status(500).send(error.message);
    // }
    try 
  {
    const input = request.body;
    const seller = new Sellers(input);
    await seller.save();
    response.status(200).send('Registered Successfully');
  } 
  catch(e) 
  {
    response.status(500).send(e.message);
  }
  };

module.exports = {checkadminlogin,viewcustomers,deletecustomer,viewsellers,deleteseller,addSeller}