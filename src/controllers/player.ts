const db = require('../db/index.ts');

const addPlayer = (req, res) => {
  const {name, number, position, height, teamName} = req.body;
  const twoDigitsRegex = /^[0-9]?[0-9]$/;
  const positionsRegex = /^PF|C|SG|PG|SF$/i;
  if (typeof name === 'string' && name.length < 100 &&
  positionsRegex.test(position) && twoDigitsRegex.test(height) &&
  twoDigitsRegex.test(number) && typeof teamName === 'string') {
    const queryStrTeam = `SELECT id FROM teams WHERE name='${teamName}';`;
    db.query(queryStrTeam, (err, results, field) => {
      if (err) { throw err; }
      if (results.length === 0) {
        res.status(400).json(`Team name not in database. Try again.`);
      } else {
        const idTeam = results[0].id;
        const queryStrInsert = `SELECT name FROM players WHERE name='${name}' AND idTeam=${idTeam}`;
        db.query(queryStrInsert, (err, results, fields) => {
          if (err) { throw err; }
          if (results.length === 0) {
            const queryStrInsert = `INSERT INTO players (name, number, position, height,
              twoPointMade, twoPointAttempted, threePointMade, threePointAttempted,
              freeThrowMade, freeThrowAttempted, rebounds, steals, blocks, assists,
              gamesPlayed, turnovers, idTeam) VALUES ('${name}', '${number}',
              '${position}', '${height}', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);`;
            db.query(queryStrInsert, (err, results, fields) => {
              if (err) { throw err; }
              res.status(201).json(`Post player ${name} successful to ${teamName}.`);
            });
          } else {
            res.status(400).json('Player with that name already on this team. Try again.');
          }
        });
      }
    });
  } else {
    const message = `Name length must be less than 100. Number and height must be
      two digits or less. Position must be one of C,PF,SF,SG,PG only. Teamname
      must be string. Try again.`;
    res.status(400).json(message);
  }
}

const getPlayersForTeam = (req, res) => {
  // NOT WORKING YET
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

const getPlayersForDivision = (req, res) => {
  // NOT WORKING YET
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

const getSpecificPlayer = (req, res) => {
  // NOT WORKING YET
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

const updateSpecificPlayer = (req, res) => {
  // NOT WORKING YET
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
  addPlayer,
  getPlayersForDivision,
  getPlayersForTeam,
  getSpecificPlayer,
  updateSpecificPlayer
};
