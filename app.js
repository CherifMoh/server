const express = require('express')
const morgan = require('morgan');
const mongoose = require('mongoose')
const Blog = require('./models/users')

// express App
const app = express()

// connect to mongodb & listen for requests
const dbURL = "mongodb+srv://cherif:Mchchch7@node.cazhmpi.mongodb.net/?retryWrites=true&w=majority&appName=node";

mongoose.connect(dbURL)
    .then(result => app.listen(3000))
    .catch(err => console.log(err));


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.post('/blogs',(req, res)=>{
    const blog = new Blog(req.body)

    blog.save()
        .then(result=>{
            res.redirect('/about')
        })
        .catch(err=>{
            console.log(err)
        })
})

app.get('/blogs',(req, res)=>{
    Blog.find()
        .then(result=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
})

app.delete('/blogs/:id',(req, res)=>{
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then(result=>{
            res.json({redirect:'/index'})
        })
        .catch(err=>console.log(err))
})

// sending HTML
app.get('/',(req, res)=>{
    res.sendFile('./public/HTML/index.html', {root : __dirname})
})

app.get('/about',(req, res)=>{
    res.sendFile('./public/HTML/about.html', {root : __dirname})
})

//404 error
app.use((req, res)=>{
    res.status(404).sendFile('./public/HTML/404.html', {root : __dirname})
})

