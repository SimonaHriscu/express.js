
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true})) // extended posts nested obj
//we use when we try to pass info that comes from a html form

app.get('/', (req,res)=>{
   // console.log(__dirname + "/index.html");
    res.sendFile(__dirname + "/index.html");// sendFile for files
})
app.post('/',(req,res)=>{
  //  console.log(req.body)
    let num1 = Number(req.body.num1); // to turn string in number
    let num2 = Number(req.body.num2);
    let result = num1+num2;
    res.send(`The result is ${result}`)
})

app.listen(port, ()=>{
    console.log('Listening to localhost:3000')
})