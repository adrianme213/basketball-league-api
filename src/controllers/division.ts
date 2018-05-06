const db = require('../db/index.ts');

const addDivision = (req, res) => {
  const {name, description, idSeason} = req.body;
  if ((name.length < 101 && typeof name === 'string') && (description.length < 256 && typeof description === 'string') && typeof idSeason === 'number') {
    const queryStrSeason = `SELECT monthYearStartDate as 'season' FROM seasons WHERE id=${idSeason};`;
    db.query(queryStrSeason, (err, results, field) => {
      if (err) { throw err; }
      if (results.length === 0) {
        res.status(400).json('Season\'s id is not in database. Try again.');
      } else {
        const queryStrDivision = `SELECT name FROM divisions WHERE name='${name}' AND idSeason=${idSeason};`;
        db.query(queryStrDivision, (err, results, fields) => {
          if (err) { throw err; }
          if (results.length === 0) {
            const queryStrInsert = `INSERT INTO divisions (name, description, idSeason) VALUES ('${name}', '${description}', ${idSeason});`;
            db.query(queryStrInsert, (err, results, fields) => {
              if (err) { throw err; }
              res.status(201).json('Post division successful.');
            });
          } else {
            res.status(400).json('Season already has a division with that name. Try again.');
          }
        });
      }
    });
  } else {
    res.status(400).json('Division entries must be strings (name length < 100 and description length < 255). Try again.');
  }
}

const getDivisions = (req, res) => {
  db.query('SELECT name, description FROM divisions;', (err, results, fields) => {
    if (err) { throw err; }
    res.status(200).json(results);
  });
}

const getSpecificDivision = (req, res) => {
  const { name, idSeason } = req.query;
  if (name === undefined || idSeason === undefined) {
    res.status(400).json('Name and season id required. Try again.');
  } else {
    if (/^[0-9]+$/.test(idSeason) && typeof name === 'string') {
      const queryStr = `SELECT name, description FROM divisions WHERE name='${name}' AND idSeason=${idSeason};`;
      db.query(queryStr, (err, results, fields) => {
        if (err) { throw err; }
        res.status(200).json(results);
      });
    } else {
      res.status(400).json('Name must be string and season id a number. Try again.');
    }
  }
}

module.exports = {
  addDivision,
  getDivisions,
  getSpecificDivision
};
