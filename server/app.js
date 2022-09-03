const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'})

require('./db/conn');
app.use(express.json());
app.use(require('./router/auth'));
const PORT = process.env.PORT;

const middleware=(req,res,next)=>
{
    console.log('hello middle');
    next();
};

app.get('/',(req,res)=>
{
    res.send('hello');
});

app.get('/about',middleware,(req,res)=>
{
    res.send('helo from app');
});
app.listen(PORT,()=>

{
  console.log('hi to port '+ PORT);
})