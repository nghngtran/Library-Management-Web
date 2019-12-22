let express = require('express');
let indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
    let bookController = require('../controllers/bookController');
    bookController
        .getHotBooks()
        .then(data => {

            res.locals.hotbooks = data;
            return bookController.getNewBooks();

        })
        .then(data=>{
            res.locals.item = {
                id: "homepage",
                title: "Trang chủ"
            }; 
            res.locals.newbooks = data;
            res.render("homepage");
        })
        .catch(err => next(err))

})

indexRouter.get("/library", (req, res) => {
    res.locals.item = {
        id: "library",
        title: "Thư viện"
    };
    res.render("library");
})



indexRouter.get("/rule", (req, res) => {
    res.locals.item = {
        id: "rule",
        title: "Quy định"
    };
    res.render("rule");
})


indexRouter.get("/news", (req, res) => {
    res.locals.item = {
        id: "new",
        title: "Tin tức"
    };
    res.render("news");
})

indexRouter.get("/response", (req, res) => {
    res.locals.item = {
        id: "response",
        title: "Phản hồi"
    };
    res.render("response");
})

indexRouter.get("/help", (req, res) => {
    res.locals.item = {
        id: "help",
        title: "Trợ giúp"
    };
    res.render('help');
})


module.exports = indexRouter;