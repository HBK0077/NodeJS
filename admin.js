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
    try{
        const description = req.body.description;
        const amount = req.body.amount;
        const category = req.body.category;
        console.log(description, amount);
        const data = await expense.create({
            description: description,
            amount: amount,
            category: category,
            userId: req.user.id
        })
        console.log(req.user.id);
        res.json({newexpense: data});
    }
    catch(err){
        console.log(err);
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
        if(password.length<5){
            return(res.json({msg:"password should atleast contain 5 letters",
        success: false}));
        }
        bcrypt.hash(password, 5, async(error, hash)=>{
            if(error){
                return res.json({msg:"Encryption error", success:false});
            }else{
                const found = await user.findAll({
                    where:{
                        email: checkemail
                    }
                })
                if(found.length != 0){
                    res.json({msg:"User Already exists!! Please enter a different email", success:false});
                }else{
                    const data = await user.create({
                    name:name,
                    email:email,
                    password:hash
                })
                res.json({newUser: data, msg:"User created", success: true});
            }    
            }
            
        })
    }

    catch(err){
        res.json({
            Error: err
        })
    }

}
function generateAccessToken(id, isPremium){
    return jwt.sign({userId: id, isPremium}, 'secretKeyIsBiggerValue')
}

exports.userLogin = async(req,res,next)=>{
    try{
        const checkEmails = req.body.email;
        const checkPassword = req.body.password;
        console.log(checkEmails);
        const login = await user.findAll({
            where:{
                email:checkEmails
            }
        })
        console.log(login[0]);
        if(login.length>0){
            bcrypt.compare(checkPassword, login[0].password, async(err, result)=>{
                if(err){
                    return(res.json({msg:"dcrypting error",
                    success:false}))
                }
                //console.log(result);
                if(result===true){
                    //res.redirect("index.html");
                    return(
                        res.json({msg:"Password is correct",
                    success:true, token: generateAccessToken(login[0].id, login[0].isPremium)}
                    ))
                }else{
                    return(res.json({msg:"Password is incorrect",
                    success:false}))
                }
            })
        }
        else{
                return(res.json("User doesnt exist"));
            }
            
    }
    catch(error){
        res.json({Error: error});
    }
}

exports.getExpenses = async(req,res,next)=>{
    try{
        const data = await expense.findAll({where: {userId: req.user.id }})
            return res.json({allExpense: data});
        
        

    }catch(err){
        console.log("Error in app.js get method");
        return res.json({Error: err});

    }
}

exports.deleteExpense = async(req,res,next)=>{
    try{
        if(!req.params.id){
            throw new Error("Id is mandatory");
        }
    const detailsId = req.params.id;
    await expense.destroy({where: {id:detailsId, userId: req.user.id}});
    return res.json({msg:"Deleted", success:true})
    }
    catch(err){
        console.log("Error in app.js delete Method");
        res.json({Error: err});
    }
}

exports.premiumMembership = async(req,res,next)=>{
    try{
            var rzp = new RazorPay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET
            })
            //console.log(rzp);
            const amount=2500;
            rzp.orders.create({amount, currency: "INR"}, (err,order)=>{
                if(err){
                    throw new Error(JSON.stringify(err));
                }
                req.user.createOrder({orderid: order.id, status: "PENDING"}).then(()=>{
                    return res.status(201).json({order, key_id: rzp.key_id});
                }).catch(err=>{
                    console.log(err);
                    return res.json({Error: err});
                })
            })

    }catch(err){
        console.log(err);
        res.json({Error: err});
    }
}

exports.updateStatus = async(req,res,next)=>{
    try{
        const {payment_id, order_id} = req.body;
        //console.log(payment_id, order_id);
        const orders = await order.findOne({where: {orderid: order_id}});
        console.log(payment_id);
        if(payment_id === null){
            res.json({success: false, msg:"Payment Failed"})
            return orders.update({paymentid: payment_id, status:"FAILED"});
        }
        await orders.update({paymentid: payment_id, status: "SUCCESSFUL"});
        //console.log(payment_id);
        await req.user.update({isPremium: true});
        return res.json({success: true, msg:"Transaction Sccessfull", token: generateAccessToken(req.user.id, true)});
    }catch(err){
        console.log(err);
        res.json({Err: err});
    }
}

exports.leaderboardDetails = async(req,res,next)=>{
    try{
        const leaderBoardOfUsers = await user.findAll({
            attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('Expenses.amount')), 'totalCost']],
            include: [
                {
                    model: expense,
                    attributes: []
                }
            ],
            group: ['users.id'],
            order: [['totalCost', "DESC"]]
        });

        res.json(leaderBoardOfUsers);

    }catch(err){
        console.log(err);
    }
}