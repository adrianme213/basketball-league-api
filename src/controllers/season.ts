const db = require('../db/index.ts');

const addSeason = (req, res) => {
  const seasonName = req.body.monthYearStartDate;
  const seasonFormatRegex = /\d{2}\/\d{4}/;
  if (seasonFormatRegex.test(seasonName) && seasonName.length === 7) {
    const queryStr = `SELECT monthYearStartDate FROM seasons WHERE monthYearStartDate='${seasonName}';`;
    db.query(queryStr, (err, results, fields) => {
      if (err) { throw err; }
      if (results.length > 0) {
        res.status(400).json('Season already in database. Try again.');
      } else {
        const queryStrInsert = `INSERT INTO seasons (monthYearStartDate) VALUES ('${seasonName}');`;
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
  db.query('SELECT monthYearStartDate FROM seasons;', (err, results, fields) => {
    if (err) { throw err; }
    res.status(200).json(results);
  });
}

const getSpecificSeason = (req, res) => {
  const seasonName = req.query.monthYearStartDate;
  const seasonFormatRegex = /\d{2}\/\d{4}/;
  const queryStr = `SELECT monthYearStartDate FROM seasons WHERE monthYearStartDate='${seasonName}';`;
    if (seasonFormatRegex.test(seasonName) && seasonName.length === 7) {
      db.query(queryStr, (err, results, fields) => {
        if (err) { throw err; }
        res.status(200).json(results);
      });
    } else {
      res.status(400).json('Season format wrong. Must be \'00/0000\'. Try again.');
    }
}

module.exports = {
  addSeason,
  getSeasonNames,
  getSpecificSeason
};
