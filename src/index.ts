// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');

// Import routes
const router = require('./routes/index.ts');
const {logTimeUrl, setHeaders} = require('./middleware/index.ts');

// Connect .env Environment Variable
require('dotenv').config({ path: path.join(__dirname, '../.env')});

// Setup server
const app = express();
const port = process.env.PORT;
app.use(setHeaders);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logTimeUrl);

// Static files
app.use(express.static(path.join(__dirname, '../../basketball-league-ui/src/index.html')));
app.use('/api', router);
app.get('/', (req, res) => res.json('Hello World!'))
app.get('/*', (req, res) => res.status(404).json('This page does not exist'));

// Create server and turn on server
const server = http.createServer(app);
server.listen(port, () => console.log(`Example app on Port: ${port}`));
module.exports = server;
