//here we add, get and deleted the expense
const expense = require("../models/expense");
const user = require("../models/user"); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const RazorPay = require('razorpay');
const order = require("../models/orders");
const sequelize = require("../util/database");
require('dotenv').config();

exports.addExpenses = async(req,res,next)=>{
    const transaction = await sequelize.transaction();
    try{
        
        const description = req.body.description;
        const amount = req.body.amount;
        const category = req.body.category;
        console.log(description, amount);
        let totalExpense=0;
        const data = await expense.create({
            description: description,
            amount: amount,
            category: category,
            userId: req.user.id
        },
        {transaction: transaction})
        totalExpense = Number(req.user.totalExpense)+ Number(amount);
        await user.update({
            totalExpense:totalExpense
        },
        {
            where:{id: req.user.id},
            transaction: transaction
        }
        )
        console.log(req.user.id);
        res.json({newexpense: data, success: true});
        await transaction.commit();
    }
    catch(err){
        await transaction.rollback();
        console.log(err);
        res.json({
            Error: err
        });
        
       
    }

}


exports.getExpenses = async(req,res,next)=>{
    try{
        const data = await expense.findAll({where: {userId: req.user.id }})
        //console.log(data);
            return res.json({allExpense: data});
        
        

    }catch(err){
        console.log("Error in app.js get method");
        return res.json({Error: err});

    }
}


exports.deleteExpense = async(req,res,next)=>{
    const transaction = await sequelize.transaction();
    try{
        if(!req.params.id){
            throw new Error("Id is mandatory");
        }
    const detailsId = req.params.id;
    const amount = req.params.amount;
    console.log(amount);
    let minusExpense = 0;
    await expense.destroy({
        where: {
            id:detailsId, 
            userId: req.user.id
        }
    });
    //minusExpense = totalExpense - amount;
    await user.update({
        totalExpense: totalExpense - amount,
        where:{
            id: req.user.id
        }
    },{
        transaction: transaction
    })
    res.json({msg:"Deleted", success:true});
    await transaction.commit();
    }
    catch(err){
        console.log("Error in app.js delete Method");
        res.json({Error: err});
        await transaction.rollback();
    }
}
