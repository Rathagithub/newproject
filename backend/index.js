const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/Router');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use('/api', routesHandler);

port = 8001

app.listen(port, () => {
 console.log("Server is running on port 8001.");
});



module.exports = function (app) {
 app.use(createProxyMiddleware('/api/**', {
  target: 'http://localhost:8001'
 }));
};