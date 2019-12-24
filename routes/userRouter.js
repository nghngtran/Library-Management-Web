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

userRouter.post('/',(req,res,next)=>{
    res.locals.item = {
        id : "accountmanagement",
        title :"Quản lý tài khoản"
    }
    let updatedUser = {
        phone : req.body.phone,
        email : req.body.email,
        address : req.body.address,
        password : req.body.newpassword
    }

    let confirmNewPassword = req.body.confirmnewpassword;
    let currentPassword = req.body.password;

    // userController
    //     .getUserByUsername()

    // if (!userController.comparePassword(password,currentPassword)){
    //     return res.render('accountmanagement',{
    //         message : "Incorrect Password!",
    //         type: 'alert-danger'
    //     })
    // }


    if (confirmNewPassword != updatedUser.password){
        return res.render('accountmanagement',{
            message : "Confirm password does not match!",
            type: 'alert-danger'
        })
    }

    if (currentPassword != updatedUser.password){
        return res.render('accountmanagement',{
            message : "The current password and the new password are the same!",
            type: 'alert-danger'
        })
    }

    


})

userRouter.get('/register',(req,res)=>{
    res.locals.item = {
        id : "register",
        title :"Đăng kí"
    }
    res.render('register');
})

userRouter.get('/login',(req,res)=>{
    res.locals.item = {
        id : "login",
        title :"Đăng nhập"
    }
    res.render('login');
})

userRouter.post('/register',(req,res,next)=>{
    res.locals.item = {
        id : "register",
        title :"Đăng kí"
    }
    let addeduser = {
        id : req.body.studentid,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    }
    
    let confirmPassword = req.body.confirmPassword;
    let keepLoggedIn = (req.body.keepLoggedIn != undefined)
    // Kiểm tra confirm password
    if (addeduser.password != confirmPassword)
        return res.render('register',{
            message: "Confirm password does not match!",
            type: 'alert-danger'

        })
    // User tồn tại
    userController.getUserByUsername(addeduser.username)
        .then(user=>{
            if (user){
                return res.render('register',{
                    message:'Username exists!',
                    type: 'alert-danger'
                })
            }
    //Tạo TK
            userController
                .createUser(addeduser)
                .then(user=>{
                    if (keepLoggedIn){
                        req.session.user = user;
                        res.redirect('/');
                    }
                    else {
                    res.render('login',{
                        message: 'You have registerd, now please login!',
                        type :'alert-primary'
                    })
                    }
                })
                .catch(err =>next(err))
        })

})

userRouter.post('/login',(req,res,next)=>{
    let  username = req.body.username;
    let  password = req.body.password
    console.log(username);
    userController
        .getUserByUsername(username)
        .then(user=>{
            if (user){
                if(userController.comparePassword(password,user.password))
                {
                    req.session.user = user;
                    if (user.username=='admin'){
                        res.redirect('/admin')
                    }
                    else {
                    res.redirect('/');
                    }
                } else {
                    res.locals.item = {
                        id : "login",
                        title :"Đăng nhập"
                    }
                    res.render('login',{
                        message : 'Incorrect Password',
                        type : 'alert-danger'
                    })   
                }
            }
            else {
                res.locals.item = {
                    id : "login",
                    title :"Đăng nhập"
                }
            res.render('login',{
                message : 'Username does not exist!',
                type : 'alert-danger'
                })
            }
        })
        .catch(err => next(err))
})

userRouter.get('/logout',(req,res,next)=>{
    req.session.destroy(err=>{
        if (err){
            return next(err)
        }
        return res.redirect('/user/login')
    })
})

userRouter.get('/borrowwing',(req,res)=>{
    res.locals.item = {
        id : "borrowwingmanagement",
        title :"Quản lý sách mượn"
    }
    res.render('borrowwingmanagement');
})

module.exports = userRouter;