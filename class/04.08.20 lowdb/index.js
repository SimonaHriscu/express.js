const express = require('express');
const low = require('lowdb');
const FileSync =  require('lowdb/adapters/FileSync');
const app = express();
const port = 3000;
const jsonFile = new FileSync('db.json');
const db = low(jsonFile);


//db init
app.get('/new',(req, res)=>{
    db.defaults({articles:[], user:{},num:1}).write();
    res.send('New db being init');
})
//adding new articles
app.get('/add',(req, res)=>{
    // url      /add?id=1&title=1+like+water
    const id = req.query.id;
    const title = req.query.title;
    db.get('articles').push({id: id, title: title}).write();
    res.send(`New data being entered with id =${id} and title=${title}`);
})
//look up
app.get('/find',(req, res)=>{
    // url/find?id=1
    const idToFind = req.query.id;
    res.send(db.get('articles').find({id:idToFind}).value());
})

//update 
app.get('/update',(req,res)=>{
    db.update('num', (n)=> n+1).write();
    const num = db.get('num').value();
    res.send(`num was increased by 1, num is now ${num}`)
})

//user name
app.get('/user',(req,res)=>{
   // url /user?name=Hadi
   const name = req.query.name;
   db.set('user.name', name).write();
   res.send(`Hey ${name}`)
})

//Post method 
//url https://website.com/login
// {
//  'email':'my@email.co',
//  'password': '000callme000
// }

app.post('/login', (req,res)=>{
    const userName = req.body.email;
    const userPass = req.body.password;
})

app.listen(port, ()=>{
    console.log(`Server listens on http://localhost:${port}`)
})