const db = require('../db/index.ts');
// const mysql = require('mysql');

const addTeamToDivision = (req, res) => {
  console.log('This data', req.url )
  console.log('This data', req.body )

  res.status(201).json('Successful team post');
}

const getAllTeamsByDivision = (req, res) => {
  console.log('This data', req.url );

  db.query('SELECT * FROM teams;', (err, results, fields) => {
    if (err) { throw err; }
    // SEND BACK RESPONSE
    res.status(200).json(results);
  });
}

module.exports = {
  addTeamToDivision,
  getAllTeamsByDivision
};
