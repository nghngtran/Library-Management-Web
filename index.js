//DECLARE
const express = require('express');
const expressHbs  = require('express-handlebars'); 
const bodyParse = require('body-parser');
const nodemailer = require('nodemailer');
var app = express();
const expressHbs  = require('express-handlebars');
var models = require('./models');


//SET FOLDER
app.use(express.static(__dirname + '/assets'));

//SET VIEW
let paginateHelper = require('express-handlebars-paginate');
var hbs = expressHbs.create({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'layout',
    helpers : {
        createPagination : paginateHelper.createPagination,
        ifCond : function (v1, operator, v2, options) {
            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        }
    }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');



//Use body parser
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// COokie parser
var cookieParser = require('cookie-parser')
app.use(cookieParser())
//Session 
let session = require('express-session')
var MemoryStore = session.MemoryStore;
app.use(session({
    cookie : {maxAge : 30 * 24 * 60 * 60 * 1000},
    secret : 'S3cret',
    resave : false,
    store : new MemoryStore(),
    saveUninitialized : false
}))
app.use((req,res,next)=>{
    res.locals.username = req.session.user ?  req.session.user.username : '';
    res.locals.phone = req.session.user ?  req.session.user.phone : '';
    res.locals.email = req.session.user ? req.session.user.email : '';
    res.locals.address = req.session.user ? req.session.user.address : '';
    res.locals.isLoggedIn = req.session.user ? true : false;
    console.log("Session");
    console.log("User:", res.locals.isLoggedIn);
    next();
})
app.use("/user", require('./routes/userRouter'));
app.use("/",require('./routes/indexRouter'));
app.use("/search", require('./routes/searchRouter'));
app.use("/admin", require('./routes/adminRouter'));


app.get('/sync', function(req, res){
	models.sequelize.sync().then(function(){
		res.send('database sync completed!');
	});
});

//Body Parser Middleware


//ACTIVATE SERVER
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`server is listening on port ${app.get('port')}`);
});
