const express = require('express');
const app = express();
const port = 8181;



const middleware1 = (req, res, next) =>{
    req.customprop = 'felly1*-p0.2200#$'// This custom property can be read and "update" in the next middleware
    console.log(' I am Middleware 1');
    next();
}

const middleware2 = (req, res, next) =>{
    console.log(`In Midd2, I've passed the Midd1 custom prop ${req.customprop}`);
    //throw new Error('Exception message');
    req.customprop = 'property updated'
    next();
}

function stdMiddle(req, res, next){
    console.log('Standard Middleware');
   // next()
}


const errorHandler = (err, req, res, next)=>{
    if (err)
    res.send('<h1>There was an error. Please try again</h1>')
}

app.use(middleware1)
app.use(middleware2)
app.use(errorHandler)
// app.use(middleware1)
// app.use(errorHandler2)
// app.get('/',stdMiddle);
app.get('/', (req, res)=>{
    res.send(`${req.customprop}`)
})
//app.get('/', middleware1, stdMiddle, middleware2); //middleware2 won't be called. no next() in stdMiddle()
//app.get('/midd', middleware2, stdMiddle, middleware2);
// app.get('/', (req, res, next)=>{
//     res.send('<h1>Hello Middleware!</h1>')
// } );

app.listen(port, ()=>console.log(`App running on port ${port}`));