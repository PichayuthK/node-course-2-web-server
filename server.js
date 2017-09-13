const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port = process.env.PORT || 3000;

//.second middleware
app.use((req, res, next) => {
    var now = new Date().toString();

    var log = (`${now}: ${req.method} ${req.url}`)
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unbale to append to server.log');
        }
    });

    next();
});
// third middleware
app.use((req,res,next)=>{
    res.render('maintenance.hbs');
    next();
});

//middleware
app.use(express.static(__dirname + '/public'));

//add partial
hbs.registerPartials(__dirname + '/views/partials');

//view template
app.set('view engine', 'hbs');

//add helper > register function to dunamically run
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    // res.send('Hello Express!');
    res.render('home.hbs', {
        pageTitle: 'Home page',
        greetingMessage: "Hello this is Peace's homepage"
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        message: 'Error page'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});