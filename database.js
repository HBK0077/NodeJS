const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete','root','5424',{
    dialect: 'mysql', 
    host: 'localhost'
});


module.exports = sequelize;