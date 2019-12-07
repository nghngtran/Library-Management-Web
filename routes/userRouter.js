let express = require('express');
let userRouter = express.Router();

userRouter.get('/',(req,res)=>{
    res.locals.item = {
        id : "accountmanagement",
        title :"Quản lý tài khoản"
    }
    res.render('accountmanagement');
})

userRouter.get('/borrowwing',(req,res)=>{
    res.locals.item = {
        id : "borrowwingmanagement",
        title :"Quản lý sách mượn"
    }
    res.render('borrowwingmanagement');
})

module.exports = userRouter;