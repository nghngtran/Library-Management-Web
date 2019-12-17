let express = require('express');
let searchRouter = express.Router();
searchRouter.get("/:id", (req, res, next) => {
    const index = req.params.id;
    let bookController = require('../controllers/bookController');
    bookController
        .getAll()
        .then(data=>{
            res.locals.item = {
                id: "search",
                title:"Mượn sách"
            };
            var context = {
                book : data[index]
            }
            res.render("detailBook", context);
        })
        .catch(err => next(err))

})
searchRouter.get("/", (req, res, next) => {
    let bookController = require('../controllers/bookController');
    bookController
        .getAll(req.querry)
        .then(data=>{
            res.locals.item = {
                id: "search",
                title:"Tìm kiếm"
            };
            res.locals.books = data.rows;
            console.log(data.rows);
            console.log(data.count);
            res.locals.pagination = {
                page : parseInt(req.query.page),
                limit : parseInt(req.query.limit),
                totalRows : data.count
            }
            res.render("search");
        })
        .catch(err => next(err))
})


module.exports = searchRouter;