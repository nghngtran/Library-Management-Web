var controller = {};
var models = require('../models');
let User = models.User;
const saltRounds = 10;
let bcrypt = require('bcryptjs');

controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        let options = {
            attribute: ['id', 'username', 'email', 'phone', 'address', 'role'],
            where: {

            }
        }
        if (query.limit > 0) {
            options.limit = query.limit,
                options.offset = query.limit * (query.page - 1)
        }
        User
            .findAndCountAll(options)
            .then(data => resolve(data))
            .catch(err => reject(Error(err)))
    })
}

controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        let options = {
            attribute: ['id', 'username', 'email', 'phone', 'address', 'role'],
            where: {

            }
        }
        User
            .findAndCountAll(options)
            .then(data => resolve(data))
            .catch(err => reject(Error(err)))
    })
}

controller.getUserByUsername = (username) => {
    return User.findOne({
        where: { username: username }
    })
};

controller.getUserByEmail = (email) => {
    return User.findOne({
        where: { email: email }
    })
}

controller.getUserById = (id) => {
    return User.findOne({
        where: { id: id }
    })
}

controller.createUser = (user) => {
    var salt = bcrypt.genSaltSync(saltRounds)
    user.password = bcrypt.hashSync(user.password, salt)
    return User.create(user)
}

controller.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)

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


controller.updatePersonal = async function(username, phone, address, email) {

    await User.update({ phone: phone, email: email, address: address }, { where: { username: username }, returning: true, plain: true });

    return User.findOne({ where: { username: username } })



}


module.exports = controller;