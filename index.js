//DECLARE
const express = require('express');
const bodyParse = require('body-parser');
const hbs = require('express-handlebars');
const nodemailer = require('nodemailer');
var app = express();
//SET FOLDER
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(express.static(__dirname + '/assets'));

//SET VIEW
app.engine('hbs', hbs({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'layout'
}));
app.set('view engine', 'hbs');


app.use("/", require('./routes/indexRouter'));
app.use("/user", require('./routes/userRouter'));


//ACTIVATE SERVER
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`server is listening on port ${app.get('port')}`);
});
//Body Parser Middleware

app.post('/send', (req, res) => {
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
        from: '"Tri Nguyen 👻" <nhokbm113@gmail.com>', // sender address
        to: "nhokbm13@gmail.com", // list of receivers
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

        // window.alert("Gửi yêu cầu thành công !");
    });
});