const mysql = require('mysql');

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
