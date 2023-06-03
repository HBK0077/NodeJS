const expense = require("../models/expense");
const user = require("../models/user"); 
require('dotenv').config();
const AWS = require("aws-sdk");



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

//download user expense
exports.downloadExpense = async(req,res,next)=>{
    try{
        const expenses = await req.user.getExpenses();
        //here expenses is an array and we cannot write an array into the file.
        console.log(expenses);
        //so we convert it to string using strigify.
        const stringifiedExpenses = JSON.stringify(expenses);
        const userId = req.user.id;

        const fileName = `Expenses${userId}/${new Date()}.txt`;
        const fileUrl = await uploadToS3(stringifiedExpenses, fileName);
        console.log(fileUrl);
        return res.json({fileUrl, success:true});
        

    }catch(err){
        console.log(err);
        return res.json({sucess: false, msg:"File Url is not created, Some error in creation of S3"});
    }
}

async function uploadToS3(data, fileName){
    try{
        const BUCKET_NAME="expensetracker07";
        const IAM_USER_KEY="AKIAQWAA5DPSKFFYVPH5";
        const IAM_USER_SECRET_KEY="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"; 

        let s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET_KEY
        })

            var params = {
                Bucket: BUCKET_NAME,
                Key: fileName,
                Body: data,
                ACL: "public-read"
            }
            return new Promise((resolve, reject)=>{
                s3bucket.upload(params, (err, s3response)=>{
                    if(err){
                        console.log("Something went wrong",err);
                        reject(err);
                    }else{
                        console.log("Success", s3response);
                        resolve(s3response.Location);
                    }
                });
            })
            

    }catch(err){
        console.log(err);
    }
}