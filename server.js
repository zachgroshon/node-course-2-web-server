const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var logged = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', logged + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  })
  next();
});

app.use((req,res,next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', ()=> new Date().getFullYear())
hbs.registerHelper('screamIt', (text)=> text.toUpperCase());

app.get('/',(req,res) => {
  res.render('home.hbs',{
    name: 'Zach',
    message: `Welcome, Zach`,
    pageTitle: 'Home Page'
  });
});

app.get('/test',(req,res) => {
  res.send({
    name: 'Zach',
    age: 28,
  })
});

app.get('/about',(req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
    name: 'Zach',
    message: `This is the about page.`
  });
});

app.get('/bad', (req,res)=> {
  res.send({
    error: '404 error',
    description: 'Could not find content'
  })
})

app.listen(3000, () =>{
  console.log('Server running on port 3000');
});
