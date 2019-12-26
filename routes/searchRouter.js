let express = require('express');
let searchRouter = express.Router();
searchRouter.get("/:id", (req, res, next) => {
    const index = req.params.id;
    console.log(index)
    let bookController = require('../controllers/bookController');
    bookController
        .getById(index)

        .then(data=>{
            
            res.locals.item = {
                id: "borrow",
                title:"Mượn sách"
            };
            res.locals.book = data;
            res.render("detailBook");
        })
        .catch(err => next(err))

})
searchRouter.get("/", (req, res, next) => {
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
    var request = req.query;
    let bookController = require('../controllers/bookController');
    bookController
        .getAll(request)
        .then(data=>{
            res.locals.item = {
                id: "search",
                title:"Tìm kiếm"
            };
            res.locals.books = data.rows;
            res.locals.pagination = {
                page : parseInt(req.query.page),
                limit : 4,
                totalRows : data.count
            }
            res.render("search");
        })
        .catch(err => next(err))
})

module.exports = searchRouter;