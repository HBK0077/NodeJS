const inventory = require("../models/define");


exports.addmethod= async (req,res,next)=>{
    try{
    const name = req.body.name;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const description = req.body.description;
    //console.log(name,quantity,price,description);
    const data = await inventory.create({
        name:name,
        description: description,
        quantity: quantity,
        price: price
    })
    //console.log(data);
    res.json({newitem: data})
   
    } catch(err){
        res.json({
            Error:err
        })
    }
}

exports.getmethod=async(req,res)=>{
    try{
        const data=await inventory.findAll()
        //console.log(data);
        res.json({allData: data})
    }catch(err){
        console.log("this is error from app.js in get method")
        res.json({Error:err,})
    }
    
}
//Buy 1 method
exports.buy1data=async(req,res)=>{
    const detailsId=req.params.id;
    console.log(detailsId);
    try{
    if(!req.params.id){
        throw new Error ("id is mandatory to delete")
    }
    await inventory.update(
        {quantity: req.body.quantity},
        {where: {id:detailsId}
    });
    const data = await inventory.findAll({where: {id:detailsId}})
    res.json({updated:data});
    }
    catch(err){
        console.log("error in app.js buy1 method")
        res.json({Error:err})
    }
}

//Buy 2 method
exports.buy2data=async(req,res)=>{
    const detailsId=req.params.id
    try{
    if(!req.params.id){
        throw new Error ("id is mandatory to delete")
    }
    
    await inventory.update(
        {quantity: req.body.quantity},
        {where: {id:detailsId}
    });
    const data = await inventory.findAll({where:{id:detailsId}})
    res.json({updated:data});
    }
    catch(err){
        console.log("error in app.js buy2 method")
        res.json({Error:err})
    }
}

//Buy 3 method
exports.buy3data=async(req,res)=>{
    const detailsId=req.params.id
    try{
    if(!req.params.id){
        throw new Error ("id is mandatory to delete")
    }
    await inventory.update(
        {quantity: req.body.quantity},
        {where: {id:detailsId}
    });
    const data = await inventory.findAll({where:{id:detailsId}})
    res.json({updated:data});
    }
    catch(err){
        console.log("error in app.js buy3 method")
        res.json({Error:err})
    }
}
