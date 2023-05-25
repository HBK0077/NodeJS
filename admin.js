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
        const password = req.body.password;
        const data = await user.create({
            name:name,
            email:email,
            password:password
        })
        res.json({newUser: data})
    }
    catch(err){
        res.json({
            Error: err
        })
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