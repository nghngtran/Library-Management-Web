let express = require('express');
let indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
    res.locals.item = {
        id: "homepage",
        title:"Trang chủ"
    };
    res.render("homepage");
})

indexRouter.get("/library", (req, res) => {
    res.locals.item = {
        id: "library",
        title:"Thư viện"
    };
    res.render("library");
})

indexRouter.get("/search", (req, res) => {
    res.locals.item = {
        id: "search",
        title:"Tìm kiếm"
    };
    res.render("search");
})

indexRouter.get("/rule", (req, res) => {
    res.locals.item = {
        id: "rule",
        title:"Quy định"
    };
    res.render("rule");
})


indexRouter.get("/news", (req, res) => {
    res.locals.item = {
        id: "new",
        title:"Tin tức"
    };
    res.render("news");
})

indexRouter.get("/response", (req, res) => {
    res.locals.item = {
        id: "response",
        title:"Phản hồi"
    };
    res.render("response");
})

indexRouter.get("/help",(req,res)=>{
    res.locals.item = {
        id: "help",
        title:"Trợ giúp"
    };
    res.render('help');
})


module.exports = indexRouter;