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
    var Sequelize = require('sequelize');
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
        
        if (query.search != ''){
            options.where = {
                [Sequelize.Op.or]:[
                    {
                        username : {
                            [Sequelize.Op.iLike] : `%${query.search}%`
                        }
                    },
                    {
                        role : {
                            [Sequelize.Op.iLike] : `%${query.search}%`
                        }
                    },
                    {
                        phone : {
                            [Sequelize.Op.iLike] : `%${query.search}%`
                        }
                    },
                    {
                        address : {
                            [Sequelize.Op.iLike] : `%${query.search}%`
                        }
                    },
                    {
                        email : {
                            [Sequelize.Op.iLike] : `%${query.search}%`
                        }
                    }
                ]
            }
        }
        User    
            .findAndCountAll(options)
            .then(data => resolve(data))
            .catch(err => reject(Error(err)))
    })
}

controller.updatePassword = (username, password) => {
    return User.findOne({
        where: { username: username }
    }).then((user) => {
        var salt = bcrypt.genSaltSync(saltRounds)
        password = bcrypt.hashSync(password, salt)
        console.log(user);
        if (user)
            user.update({ password: password });
    })
}

controller.getUserByUsername = (username)=>{
    return User.findOne({
        where : {username : username} 
    })
};

controller.getUserByEmail = (email) => {
    return User.findOne({
        where: { email: email }
    })
}

controller.createUser = (user) =>{
    var salt = bcrypt.genSaltSync(saltRounds)
    user.password = bcrypt.hashSync(user.password,salt)
    return User.create(user)
}

controller.removeUser = (username) => {
        return new Promise((resolve,reject)=>{
		User
			.destroy({
				where : {username : username}
            })
			.then(data=>resolve(data))
			.catch(error =>reject(new Error(error)))
	})
}

controller.updateUser = (user) =>{
    return new Promise((resolve,reject)=>{
		User
			.update(user,{
				where: {username : user.username}
			})
			.then(data=>resolve(data))
			.catch(error =>reject(new Error(error)))
	})
}

controller.comparePassword = (password, hash) =>{
    return bcrypt.compareSync(password,hash)
    
}


controller.updatePersonal = async function(username, phone, address, email) {

    await User.update({ phone: phone, email: email, address: address }, { where: { username: username }, returning: true, plain: true });

    return User.findOne({ where: { username: username } })



}




module.exports = controller;