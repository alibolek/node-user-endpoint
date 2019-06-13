const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded());
app.use(userRouter);
app.get('/', (req, res, next) => {
    res.send('<h1> Payever task</h1>');

})

server.listen(3000);

//https://reqres.in/
//https://reqres.in/api/users/{userId}