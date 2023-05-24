const Sequelize=require("sequelize")
const sequelize=require('../util/database')

const inventory=sequelize.define("inventories",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
   name:{
    type:Sequelize.STRING,
    allowNull:false
   } ,
   description:{
    type: Sequelize.STRING,
    allowNull: false
   },
   quantity:{
    type:Sequelize.INTEGER,
    allowNull:false
   },
   price:{
    type:Sequelize.DOUBLE,
    allowNull:false
   }
   
})
module.exports=inventory;