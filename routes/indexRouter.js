let express = require('express');
let indexRouter = express.Router();

let nodemailer = require('nodemailer');

indexRouter.get("/", (req, res,next) => {
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

indexRouter.post('/', (req, res) => {
    const output = `
        <p>Yêu cầu giải đáp</p>
        <ul>
            <li>Họ tên: ${req.body.name}</li>
            <li>Email người gửi: ${req.body.email}</li>
        </ul>
        <h3>Lời nhắn</h3>
        <p>${req.body.msg}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'nhokbm113@gmail.com', // generated ethereal user
            pass: 'nhokbmlove740119' // generated ethereal password
        }
    });

    let mailOptions = {
        from: '"Độc giả thư viện 👻"', // sender address
        to: "thuvien.fit.khtn@gmail.com", // list of receivers
        subject: "Lời nhắn", // Subject line
        // text: "Hello world?", // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


        res.locals.item = {
            id: "homepage",
            title: "Trang chủ"
        };
        res.render('homepage');

        // });
    });
});



module.exports = indexRouter;