//DECLARE
const express = require('express');
const expressHbs = require('express-handlebars');
const nodemailer = require('nodemailer');
var app = express();
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
    console.log("isLogin",res.locals.isLoggedIn);
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
//Body Parser Middleware

// app.post('', (req, res) => {
//     const output = `
//         <p>Yêu cầu giải đáp</p>
//         <ul>
//             <li>Họ tên: ${req.body.name}</li>
//             <li>Email người gửi: ${req.body.email}</li>
//         </ul>
//         <h3>Lời nhắn</h3>
//         <p>${req.body.msg}</p>
//     `;

//     let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: 'nhokbm113@gmail.com', // generated ethereal user
//             pass: 'nhokbmlove740119' // generated ethereal password
//         }
//     });

//     let mailOptions = {
//         from: '"Độc giả thư viện 👻"<nhokbm113@gmail.com>', // sender address
//         to: "thuvien.fit.khtn@gmail.com", // list of receivers
//         subject: "Lời nhắn", // Subject line
//         // text: "Hello world?", // plain text body
//         html: output // html body
//     };

//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }

//         console.log("Message sent: %s", info.messageId);
//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//         // Preview only available when sending through an Ethereal account
//         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


//         res.locals.item = {
//             id: "homepage",
//             title: "Trang chủ"
//         };
//         res.render('homepage');

//         // });
//     });
// });
