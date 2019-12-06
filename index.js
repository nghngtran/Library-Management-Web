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


app.get("/", (req, res) => {
    res.locals.item = "homepage";
    res.render("homepage");
})

app.get("/library", (req, res) => {
    res.locals.item = "library";
    res.render("library");
})

app.get("/search", (req, res) => {
    res.locals.item = "search";
    res.render("search");
})

app.get("/rule", (req, res) => {
    res.locals.item = "rule";
    res.render("rule");
})


app.get("/news", (req, res) => {
    res.locals.item = "new";
    res.render("news");
})

app.get("/response", (req, res) => {
    res.locals.item = "response";
    res.render("response");
})


//ACTIVATE SERVER
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`server is listening on port ${app.get('port')}`);
});