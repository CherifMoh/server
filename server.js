const http = require('http');
const fs = require('fs');
const _ = require('lodash');


const server = http.createServer((req, res)=>{
    //lodash
    const num = _.random(0, 20)
    console.log(num)


    //set header
    res.setHeader('Content-Type', 'text/html')
    
    //Routing
    let path ='./html/'
    switch(req.url) {
        case '/':
        path += 'index.html';
        res.statusCode = 200;
        break;
        case '/about':
        path += 'about.html';
        res.statusCode = 200;
        break;
        case '/about-us':
        res.statusCode = 301;
        res.setHeader('location', '/about')
        res.end()
        break;
        default:
        path += '404.html';
        res.statusCode = 404;
    }

    //Send HTML
    fs.readFile(path, (err, data)=>{
        if(err){
            console.log(err)
            res.end()
        }
        res.end(data)
    })
})

server.listen('3000','localhost',()=>{
    console.log('listening for requests on port 3000');
})

