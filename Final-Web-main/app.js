const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

const subject = require('./routes/subjectsroutes');
const home = require('./routes/homesubject');
const errorController = require('./controllers/error404')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(subject);
app.use(home);

app.use((req,res,next)=>{
    res.status(404).render('404',{docTitle:'oo',path:""});
})

app.use(errorController.getError)

app.listen(3000)