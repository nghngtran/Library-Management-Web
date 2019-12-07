//DECLARE
const express = require('express');
var app = express();
const hbs = require('express-handlebars');

//SET FOLDER
app.use(express.static(__dirname + '/assets'));

//SET VIEW
app.engine('hbs', hbs({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'layout'
}));
app.set('view engine', 'hbs');


app.use("/",require('./routes/indexRouter'));
app.use("/user", require('./routes/userRouter'));


//ACTIVATE SERVER
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`server is listening on port ${app.get('port')}`);
});