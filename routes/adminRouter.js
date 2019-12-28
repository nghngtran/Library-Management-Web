let express = require('express');
let adminRouter = express.Router();
let userController = require('../controllers/userController');
let bookController = require('../controllers/bookController');
adminRouter.get('/',(req,res)=>{
    res.locals.item = {
        id : "admin",
        title :"Trang quản trị"
    }
    res.render('admin');
})
adminRouter.get('/account/:username',(req,res,next)=>{
    let username = req.params.username
    userController
        .getUserByUsername(username)
        .then(data =>{
            res.locals.item = {
                id : "admin",
                title :"Quản lý tài khoản"
            }
            res.locals.account = data;
            res.render('admin_account_detail');
        })
        .catch(err=>next(err))
})
adminRouter.post('/account/',(req,res,next)=>{
    let username = req.params.username
    let updatedUser = {
        username : req.body.username,
        phone : req.body.phone,
        email : req.body.email,
        address : req.body.address,
        role : req.body.role
    }
    console.log(updatedUser)
    userController
        .updateUser(updatedUser)
        .then(user=>{
            console.log("Type User update:",typeof(user))
            res.locals.item = {
                id : "admin",
                title :"Quản lý tài khoản"
            }
            res.locals.account = updatedUser;
            res.render('admin_account_detail');
        })
})
adminRouter.post('/account/:username',(req,res,next)=>{
    let username = req.params.username

    userController
        .removeUser(username)
        .then(user=>{
            res.locals.item = {
                id : "admin",
                title :"Quản lý tài khoản"
            }
            res.redirect('/admin/account');
        })
})
adminRouter.get('/account',(req,res,next)=>{
    if(req.query.limit == null || isNaN(req.query.limit))
    {
        req.query.limit = 3;
    }
    if(req.query.page == null || isNaN(req.query.page))
    {
        req.query.page = 1;
    }
    if (req.query.sort==null){
        req.query.sort = 'ratings';
    }
    if (req.query.search == null){
        req.query.search = '';
    }
    if (req.query.search == null){
        req.query.search = '';
    }
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
                limit : parseInt(req.query.limit),
                totalRows : data.count
            }
            res.render('admin_account');
        })
        .catch(err=>next(err))
})
adminRouter.get('/book',(req,res,next)=>{
    if(req.query.limit == null || isNaN(req.query.limit))
    {
        req.query.limit = 4;
    }
    if(req.query.page == null || isNaN(req.query.page))
    {
        req.query.page = 1;
    }
    if (req.query.sort==null){
        req.query.sort = 'ratings';
    }
    if (req.query.search == null){
        req.query.search = '';
    }
    bookController
        .getAll(req.query)
        .then(data =>{
            console.log("book controller",data)
            res.locals.item = {
                id : "admin",
                title :"Quản lý tài khoản"
            }
            res.locals.books = data.rows;
            res.locals.pagination = {
                page : parseInt(req.query.page),
                limit : 4,
                totalRows : data.count
            }
            res.render('admin_book');
        })
        .catch(err=>next(err))
})


module.exports = adminRouter;