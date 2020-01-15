let express = require('express');
let adminRouter = express.Router()
var multer  = require('multer')
let models = require("../models")
const xlsx =  require('xlsx');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'assets/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
     
    }
});
var upload = multer({storage: storage});
let userController = require('../controllers/userController');
let bookController = require('../controllers/bookController');
adminRouter.get('/',(req,res)=>{
    res.locals.item = {
        id : "admin",
        title :"Trang quản trị"
    }
    res.render('admin');
})

adminRouter.get('/book/:bookID',(req,res,next)=>{
    let bookID = req.params.bookID;
    bookController
        .getById(bookID)
        .then(data =>{
            res.locals.item = {
                id : "admin",
                title : "Quan ly sach"
            }
            res.locals.book = data;
            res.render('admin_book_detail')
        })
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

adminRouter.post('/book/',(req,res,next)=>{
    let username = req.params.username
    let updateBook = {
        id : req.body.id,
        title : req.body.title,
        author : req.body.author,
        quantity : req.body.quantity,
        description : req.body.description
    }
    console.log(updateBook)
    let bookController = require('../controllers/bookController')
    bookController
        .updateBook(updateBook)
        .then(user=>{
            console.log(user)
            res.locals.item = {
                id : "admin",
                title :"Quản lý tài khoản"
            }
            res.locals.book = user;
            res.redirect('/admin/book');
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
        req.query.limit = 6;
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

adminRouter.post('/book/:id',(req,res,next)=>{
    let id = req.params.id

    bookController
        .removeBook(id)
        .then(user=>{
            res.locals.item = {
                id : "admin",
                title :"Quản lý tài khoản"
            }
            res.redirect('/admin/book');
        })
})
adminRouter.get('/book',(req,res,next)=>{
    if(req.query.limit == null || isNaN(req.query.limit))
    {
        req.query.limit = 5;
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

adminRouter.get('/book/:id',(req,res,next)=>{
    let id = req.params.id
    bookController
        .getById(id)
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
adminRouter.get('/request',(req,res,next)=>{
    if(req.query.limit == null || isNaN(req.query.limit))
    {
        req.query.limit = 6;
    }
    if(req.query.page == null || isNaN(req.query.page))
    {
        req.query.page = 1;
    }

    if (req.query.search == null){
        req.query.search = '';
    }
    if (req.query.search == null){
        req.query.search = '';
    }
    let requestBookController = require('../controllers/requestBookController')
    requestBookController
        .getPendingRequest()
        .then(data =>{
            console.log(data.dataValues)
            res.locals.item = {
                id : "admin",
                title :"Quản lý tài khoản"
            }
            res.locals.requests = data.rows;
            res.locals.pagination = {
                page : parseInt(req.query.page),
                limit : parseInt(req.query.limit),
                totalRows : data.count
            }
            res.render('admin_request');
        })
        .catch(err=>next(err))
})

adminRouter.get('/approvedrequest',(req,res,next)=>{
    if(req.query.limit == null || isNaN(req.query.limit))
    {
        req.query.limit = 6;
    }
    if(req.query.page == null || isNaN(req.query.page))
    {
        req.query.page = 1;
    }

    if (req.query.search == null){
        req.query.search = '';
    }
    let requestBookController = require('../controllers/requestBookController')
    requestBookController
        .getApprovedRequest()
        .then(data =>{
            
            res.locals.item = {
                id : "admin",
                title :"Quản lý tài khoản"
            }
            res.locals.requests = data.rows;
            console.log(data.rows)
            res.locals.pagination = {
                page : parseInt(req.query.page),
                limit : parseInt(req.query.limit),
                totalRows : data.count
            }
            res.render('admin_request_approved');
        })
        .catch(err=>next(err))
})

adminRouter.get('/returnrequest',(req,res,next)=>{
    if(req.query.limit == null || isNaN(req.query.limit))
    {
        req.query.limit = 6;
    }
    if(req.query.page == null || isNaN(req.query.page))
    {
        req.query.page = 1;
    }

    if (req.query.search == null){
        req.query.search = '';
    }
    let requestBookController = require('../controllers/requestBookController')
    requestBookController
        .getReturningRequest()
        .then(data =>{
            res.locals.item = {
                id : "admin",
                title :"Quản lý tài khoản"
            }
            res.locals.requests = data.rows;
            res.locals.pagination = {
                page : parseInt(req.query.page),
                limit : parseInt(req.query.limit),
                totalRows : data.count
            }
            res.render('admin_request_returning');
        })
        .catch(err=>next(err))
})

adminRouter.get('/returnedrequest',(req,res,next)=>{
    if(req.query.limit == null || isNaN(req.query.limit))
    {
        req.query.limit = 6;
    }
    if(req.query.page == null || isNaN(req.query.page))
    {
        req.query.page = 1;
    }

    if (req.query.search == null){
        req.query.search = '';
    }
    let requestBookController = require('../controllers/requestBookController')
    requestBookController
        .getReturnedRequest()
        .then(data =>{
            res.locals.item = {
                id : "admin",
                title :"Quản lý tài khoản"
            }
            res.locals.requests = data.rows;
            res.locals.pagination = {
                page : parseInt(req.query.page),
                limit : parseInt(req.query.limit),
                totalRows : data.count
            }
            res.render('admin_request_returned');
        })
        .catch(err=>next(err))
})

adminRouter.post('/returnrequest/approve/:id',(req,res,next)=>{
    let index = req.params.id;
    let updateRequest = {
        id : index,
        status : "Returned"
    }
    let requestBookController= require('../controllers/requestBookController')
    requestBookController
        .updateRequest(updateRequest)
        .then(resquest=>{
            res.redirect("/admin/returnrequest")
        })

})

adminRouter.post('/request/approve/:id',(req,res,next)=>{
    let index = req.params.id;
    let updateRequest = {
        id : index,
        status : "Approved"
    }
    let requestBookController= require('../controllers/requestBookController')
    requestBookController
        .updateRequest(updateRequest)
        .then(resquest=>{
            res.redirect("/admin/request")
        })

})


adminRouter.post('/request/deny/:id',(req,res,next)=>{
    let index = req.params.id;

    let requestBookController= require('../controllers/requestBookController')
    requestBookController
        .removeRequest(index)
        .then(resquest=>{
            res.redirect("/admin/request")
        })
})

adminRouter.post('/uploadFile',upload.single('xlsx'),(req,res,next)=>{
    console.log("=========================================")
    let data_sheet = xlsx.readFile(req.file.path);
    //console.log(data_sheet)
    let book_data = xlsx.utils.sheet_to_json(data_sheet.Sheets["Sheet1"]);
    //console.log("BOOK DATA",book_data)

    
    models.Book.max('id').then(max => {
        console.log("Hello")
        for (let i = 0 ; i < book_data.length ; i++) {     
            console.log("=========Vong===========",i)
            book_data[i].id = max + 1;
            book_data[i].createdAt = new Date();
            book_data[i].updatedAt = new Date();
            console.log(book_data[i])
            let bookController = require('../controllers/bookController')
            bookController
                .add(book_data[i])
                .then(book=>{
                    
                })
        }
            
    })
        
    res.redirect('/admin/book')

})


module.exports = adminRouter;