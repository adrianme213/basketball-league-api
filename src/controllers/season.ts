const db = require('../db/index.ts');

const addSeason = (req, res) => {
  const seasonName = req.body.yearMonthStartDate;
  const seasonFormatRegex = /\d{2}\/\d{4}/;
  if (seasonFormatRegex.test(seasonName) && seasonName.length === 7) {
    const queryStr = `SELECT yearMonthStartDate FROM seasons WHERE yearMonthStartDate='${seasonName}';`;
    db.query(queryStr, (err, results, fields) => {
      if (err) { throw err; }
      if (results.length > 0) {
        res.status(400).json('Season already in database. Try again.');
      } else {
        const queryStrInsert = `INSERT INTO seasons (yearMonthStartDate) VALUES ('${seasonName}');`;
        db.query(queryStrInsert, (err, results, fields) => {
          if (err) { throw err; }
          res.status(201).json('Post successful.');
        });
      }
    });
  } else {
    res.status(400).json('Season format wrong. Must be \'00/0000\'. Try again.');
  }
}

const getSeasonNames = (req, res) => {
  db.query('SELECT yearMonthStartDate FROM seasons;', (err, results, fields) => {
    if (err) { throw err; }
    res.status(200).json(results);
  });
}

const getSpecificSeason = (req, res) => {
  const seasonName = req.query.yearMonthStartDate;
  const queryStr = `SELECT yearMonthStartDate FROM seasons WHERE yearMonthStartDate='${seasonName}';`;
  db.query(queryStr, (err, results, fields) => {
    if (err) { throw err; }
    res.status(200).json(results);
  });
}

module.exports = {
  addSeason,
  getSeasonNames,
  getSpecificSeason
};
