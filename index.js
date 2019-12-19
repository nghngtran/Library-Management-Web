//DECLARE
const express = require('express');
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
        createPagination : paginateHelper.createPagination
    }
});
app.engine('hbs', hbs.engine);


app.set('view engine', 'hbs');

app.use("/",require('./routes/indexRouter'));
app.use("/user", require('./routes/userRouter'));
app.use("/search", require('./routes/searchRouter'));

app.get('/sync', function(req, res){
	models.sequelize.sync().then(function(){
		res.send('database sync completed!');
	});
});

//ACTIVATE SERVER
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`server is listening on port ${app.get('port')}`);
});