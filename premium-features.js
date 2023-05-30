const expense = require("../models/expense");
const user = require("../models/user"); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const RazorPay = require('razorpay');
const order = require("../models/orders");
const sequelize = require("../util/database");
require('dotenv').config();



exports.leaderboardDetails = async(req,res,next)=>{
    try{
        const leaderBoardOfUsers = await user.findAll({
            order: [['totalExpense', "DESC"]]
        });

        res.json(leaderBoardOfUsers);

    }catch(err){
        console.log(err);
    }
}