const expense = require("../models/expense");
const user = require("../models/user"); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const RazorPay = require('razorpay');
const order = require("../models/orders");
const sequelize = require("../util/database");
const Forgotpassword = require("../models/forgotpassword");
const uuid = require("uuid");

const Sib = require("sib-api-v3-sdk");
require('dotenv').config();





exports.forgotpassword = async (req, res) => {
    try {
        const { email } =  req.body;
        // console.log(email);
        const User = await user.findOne({where : { 
            email: email
         }});
        // console.log(User);
        if(User){
            const id = uuid.v4();
            console.log(id);
            const result = await User.createForgotpassword({ id , active: true });
            console.log(result); 
            const client=Sib.ApiClient.instance
            
        const apiKey=client.authentications['api-key']
        apiKey.apiKey=process.env.SENDINBLUE_API_KEY
        
        const transEmailApi=new Sib.TransactionalEmailsApi();
        const sender={
            email:"hrishikeshbalakrishna07@gmail.com"
        }
    
        const receivers=[
            {
                email:email
            }
        ]
        const data= await transEmailApi.sendTransacEmail({
            sender,
            to:receivers,
            subject:`this is the test subject`,
            textcontent:`reset password`,
            htmlContent:`<a href="http://localhost:2500/resetpassword/${id}">Reset password</a>`
            
        })
        console.log(data);
        res.json({msg:"Mail sent successfully", success:true});
        }else{
            res.json({msg:"User doesnt exist", success:false});
        }
    }catch(error){
        console.log(error);
    }
}

