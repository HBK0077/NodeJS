//here we add, get and deleted the expense
const expense = require("../models/expense");
const user = require("../models/user"); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

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
function generateAccessToken(id){
    return jwt.sign({userId: id}, 'secretKeyIsBiggerValue')
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
       
        if(login.length>0){
            bcrypt.compare(checkPassword, login[0].password, async(err, result)=>{
                if(err){
                    return(res.json({msg:"dcrypting error",
                    success:false}))
                }
                if(result===true){
                    //res.redirect("index.html");
                    return(
                        res.json({msg:"Password is correct",
                    success:true, token: generateAccessToken(login[0].id)}
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