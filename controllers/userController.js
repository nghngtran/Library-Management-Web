var controller = {};
var models = require('../models');
let User = models.User;
let bcryptjs = require('bcryptjs');


controller.getUserByUsername = (username)=>{
    return User.findOne({
        where : {username : username} 
    })
};

controller.comparePassword = (password1, password2) =>{
    if (password1 == password2)
        return true;
    return false;
    
}




module.exports = controller;