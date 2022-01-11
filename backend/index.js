const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/Router');
const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use('/api', routesHandler);

app.listen(4001, () => {
 console.log("Server is running on port 4001.");
});