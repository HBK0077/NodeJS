//here we add, get and deleted the expense
const expense = require("../models/expense");
const user = require("../models/user"); 
const bcrypt = require('bcrypt');

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
        if(password.length<5){
            return(res.json("password should atleast contain 5 letters"));
        }
        bcrypt.hash(password, 5, async(error, hash)=>{
            if(error){
                console.log("Encryption error");
            }else{
                const found = await user.findAll({
                    where:{
                        email: checkemail
                    }
                })
                if(found.length != 0){
                    res.json("User Already exists!! Please enter a different email");
                }else{
                    const data = await user.create({
                    name:name,
                    email:email,
                    password:hash
                })
                res.json({newUser: data})
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
                    return(
                        res.json({msg:"Password is correct",
                    success:true}
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