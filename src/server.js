const express = require('express');
const bodyParser = require('body-parser');
const Router = require('./router');
const cors = require('cors')
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())

app.use(cors())

//app.use(express.static(__dirname + '/View'))

app.use(Router)

app.listen('8080', ()=>{
    console.log('server rodando na porta 8080');
})