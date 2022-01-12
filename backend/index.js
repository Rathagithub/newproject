const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/Router');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use('/api', routesHandler);

let PORT = process.env.PORT || 8001

app.listen(PORT, () => {
 console.log("Server is running on port 8001.");
});

module.exports = function (app) {
 app.use(createProxyMiddleware('/api/**', { target: 'http://localhost:5000' }));
 app.use(createProxyMiddleware('/otherApi/**', { target: 'http://localhost:5000' }));
};