let express = require('express');
let adminRouter = express.Router();
adminRouter.get('/',(req,res)=>{
    res.locals.item = {
        id : "admin",
        title :"Trang quản trị"
    }
    res.render('admin');
})


module.exports = adminRouter;