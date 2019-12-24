var controller = {};
var models = require('../models');
let User = models.User;
const saltRounds = 10;
let bcrypt = require('bcryptjs');

controller.getAll = (query) =>{
    return new Promise((resolve,reject)=>{
        let options = {
            attribute : ['id','username','email','phone','address','role'],
            where : {

            }
        }
        if (query.limit > 0){
            options.limit = query.limit,
            options.offset = query.limit * (query.page -1)
        }
        User    
            .findAndCountAll(options)
            .then(data => resolve(data))
            .catch(err => reject(Error(err)))
    })
}

controller.getAll = (query) =>{
    return new Promise((resolve,reject)=>{
        let options = {
            attribute : ['id','username','email','phone','address','role'],
            where : {

            }
        }
        User    
            .findAndCountAll(options)
            .then(data => resolve(data))
            .catch(err => reject(Error(err)))
    })
}

controller.getUserByUsername = (username)=>{
    return User.findOne({
        where : {username : username} 
    })
};

controller.createUser = (user) =>{
    var salt = bcrypt.genSaltSync(saltRounds)
    user.password = bcrypt.hashSync(user.password,salt)
    return User.create(user)
}

controller.comparePassword = (password1, password2) =>{
    if (password1 == password2)
        return true;
    return false;
    
}




module.exports = controller;