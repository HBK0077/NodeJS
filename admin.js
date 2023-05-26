//here we add, get and deleted the expense
const expense = require("../models/expense");
const user = require("../models/user"); 

exports.addExpenses = async(req,res,next)=>{
    try{
        const description = req.body.description;
        const amount = req.body.amount;
        console.log(description, amount);
        const data = await expense.create({
            description: description,
            amount: amount
        })
        res.json({newexpense: data});
    }
    catch(err){
        res.json({
            Error: err
        })
    }

}
exports.addUser = async(req,res,next)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const checkemail = req.body.email;
        const password = req.body.password;
        const found = await user.findAll({
            where:{
                email: checkemail
            }
        })
        if(found != ""){
            res.json("User Already exists!! Please enter a different email");
        }else{
            const data = await user.create({
            name:name,
            email:email,
            password:password
        })
        res.json({newUser: data})
    }    
    }

    catch(err){
        res.json({
            Error: err
        })
    }

}

exports.userLogin = async(req,res,next)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const login = await user.findAll({
            where:{
                email:email,
                password: password
            }
        })
        if(!login){
            console.log("Please enter correct email and password")
            res.json({userLogin: login});
        }else{
            console.log("Enter email and password is correct")
            res.json({userLogin: login});
        }
    }
    catch(error){
        res.json({Error: error});
    }
}

exports.getExpenses = async(req,res,next)=>{
    try{
        const data = await expense.findAll()
        res.json({allExpense: data});

    }catch(err){
        console.log("Error in app.js get method");
        res.json({Error: err});

    }
}

exports.deleteExpense = async(req,res,next)=>{
    try{
        if(!req.params.id){
            throw new Error("Id is mandatory");
        }
    const detailsId = req.params.id;
    await expense.destroy({where: {id:detailsId}});
    }
    catch(err){
        console.log("Error in app.js delete Method");
        res.json({Error: err});
    }
}