const mysql = require('mysql');
const path = require('path');

// If .env is not loaded, load for config options
if (!process.env.DB_PASSWORD) {
  require('dotenv').config({ path: path.join(__dirname, '../../.env')});
}

// Create a database connection and export it from this file.
const connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : process.env.DB_PASSWORD || '',
  database  : 'basketball_league'
});

connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
  if (error) { throw error }
  console.log('MySQL DB connected: ', results[0].solution);
});

module.exports = connection;
