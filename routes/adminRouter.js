let express = require('express');
let adminRouter = express.Router();
let userController = require('../controllers/userController');
adminRouter.get('/',(req,res)=>{
    res.locals.item = {
        id : "admin",
        title :"Trang quản trị"
    }
    res.render('admin');
})

adminRouter.get('/account',(req,res,next)=>{
    userController
        .getAll(req.query)
        .then(data =>{
            res.locals.item = {
                id : "admin",
                title :"Quản lý tài khoản"
            }
            res.locals.accounts = data.rows;
            res.locals.pagination = {
                page : parseInt(req.query.page),
                limit : 4,
                totalRows : data.count
            }
            res.render('admin_account');
        })
        .catch(err=>next(err))
})


module.exports = adminRouter;