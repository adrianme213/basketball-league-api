// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

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
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/*', (req, res) => res.status(404).send('This page does not exist'));

// Turn on server
app.listen(port, () => console.log(`Example app on Port: ${port}`));
