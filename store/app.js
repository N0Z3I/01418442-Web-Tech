const http = require('http');

const express = require('express');

// middleware
const app = express();

app.use('/', (request, response, next) => {
    console.log('Defalut page, always runs');
    next();
});

app.use('/add-product', (request, response, next) => {
    console.log('Say Wi from middleware');
    response.send('<h1>Add Product<h1>');
});

app.use((request, response, next) => {
    console.log('Say Wi from middleware');
    next();
});

app.use((request, response, next) => {
    console.log('Say Fi from another middleware');
    response.send('<h1>This is WiFi<h1>');
});

//const server = http.createServer(app);
//server.listen(3000);
app.listen(3000);