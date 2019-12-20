let express = require('express');
let userRouter = express.Router();
let userController = require('../controllers/userController');
userRouter.get('/',(req,res)=>{
    res.locals.item = {
        id : "accountmanagement",
        title :"Quản lý tài khoản"
    }
    res.render('accountmanagement');
})

userRouter.get('/login',(req,res)=>{
    res.locals.item = {
        id : "login",
        title :"Đăng nhập"
    }
    res.render('login');
})

userRouter.post('/login',(req,res,next)=>{
    let  username = req.body.username;
    let  password = req.body.password

    userController
        .getUserByUsername(username)
        .then(user=>{
            if (user){
                if(userController.comparePassword(password,user.password))
                {
                    req.session.user = user;
                    res.redirect('/');
                } else {
                    res.render('login',{
                        message : 'Incorrect Password',
                        type : 'alert-danger'
                    })   
                }
            }
            else {
            res.render('login',{
                message : 'Username does not exist!',
                type : 'alert-danger'
                })
            }
        })
        .catch(err => next(err))
})

userRouter.get('/borrowwing',(req,res)=>{
    res.locals.item = {
        id : "borrowwingmanagement",
        title :"Quản lý sách mượn"
    }
    res.render('borrowwingmanagement');
})

module.exports = userRouter;