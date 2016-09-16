const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();


const port = 1338;
const url = 'https://silu:simon.lundh@upkeeper.duostation.com/api/devices'


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    next();
})

app.get('/devices', (req, res, next) => {
    request.get(url, (err, response, body) => {
        const data = JSON.parse(body);
        res.json(data);
    }, err => {
        console.log(err);
    });
});

app.listen(port, () => {
    console.log(`Server startad på port ${port}`);
});