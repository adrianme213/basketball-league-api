const db = require('../db/index.ts');

const addTeam = (req, res) => {
  const {name, idDivision} = req.body;
  if ((name.length < 101 && typeof name === 'string') && typeof idDivision === 'number') {
    const queryStrDivision = `SELECT name FROM divisions WHERE id=${idDivision};`;
    db.query(queryStrDivision, (err, results, field) => {
      if (err) { throw err; }
      if (results.length === 0) {
        res.status(400).json('Division\'s id is not in database. Try again.');
      } else {
        const divisionName = results[0].name;
        const queryStrTeam = `SELECT name FROM teams WHERE name='${name}' AND idDivision=${idDivision};`;
        db.query(queryStrTeam, (err, results, fields) => {
          if (err) { throw err; }
          if (results.length === 0) {
            const queryStrInsert = `INSERT INTO teams (name, totalWins, totalLosses, idDivision) VALUES ('${name}', 0, 0, ${idDivision});`;
            db.query(queryStrInsert, (err, results, fields) => {
              if (err) { throw err; }
              res.status(201).json(`Post team ${name} successful to ${divisionName}.`);
            });
          } else {
            res.status(400).json('Team with that name already in this division. Try again.');
          }
        });
      }
    });
  } else {
    res.status(400).json('Team name entries must be strings (name length < 100). Try again.');
  }
}

const getTeamsByDivision = (req, res) => {
  const { idDivision } = req.query;
  if (idDivision === undefined) {
    res.status(400).json('Division id required. Try again.');
  } else {
    if (/^[0-9]+$/.test(idDivision)) {
      const queryStr = `SELECT name, totalWins, totalLosses FROM teams WHERE idDivision=${idDivision};`;
      db.query(queryStr, (err, results, fields) => {
        if (err) { throw err; }
        res.status(200).json(results);
      });
    } else {
      res.status(400).json('Division id must be a number. Try again.');
    }

  }
}

const getSpecificTeam = (req, res) => {
  const { name, idDivision } = req.query;
  if (name === undefined || idDivision === undefined) {
    res.status(400).json('Name and division id required. Try again.');
  } else {
    if (/^[0-9]+$/.test(idDivision) && typeof name === 'string') {
      const queryStr = `SELECT name, totalWins, totalLosses FROM teams WHERE name='${name}' AND idDivision=${idDivision};`;
      db.query(queryStr, (err, results, fields) => {
        if (err) { throw err; }
        res.status(200).json(results);
      });
    } else {
      res.status(400).json('Name must be string and division id a number. Try again.');
    }
  }
}

const updateSpecificTeam = (req, res) => {
  const { name, totalWins, totalLosses, idDivision } = req.body;
  const numberRegex = /^[0-9]+$/;
  if (name === undefined || idDivision === undefined) {
    res.status(400).json('Name and division id required. Try again.');
  } else {
    if (numberRegex.test(idDivision) && numberRegex.test(totalWins) && numberRegex.test(totalLosses) && typeof name === 'string') {
      const queryStrSearchTeam = `SELECT id FROM teams WHERE name='${name}' AND idDivision=${idDivision};`;
      db.query(queryStrSearchTeam, (err, results, fields) => {
        if (err) { throw err; }
        if (results.length === 0) {
          res.status(400).json('That team name is not in selected division. Error updating. Try again.');
        } else {
          const { id } = results[0];
          const queryUpdateTeam = `UPDATE teams SET totalWins=${totalWins}, totalLosses=${totalLosses} WHERE id=${id};`
          db.query(queryUpdateTeam, (err, results, fields) => {
            if (err) { throw err; }
            res.status(200).json(`Team ${name} update successful.`);
          });
        }
      });
    } else {
      res.status(400).json('Name must be a string. Wins, losses, and division must be a number. Try again.');
    }
  }
}

module.exports = {
  addTeam,
  getTeamsByDivision,
  getSpecificTeam,
  updateSpecificTeam
};
