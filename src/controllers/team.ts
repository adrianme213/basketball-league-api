const db = require('../db/index.ts');

const addTeam = (req, res) => {
  const {name, divisionName} = req.body;
  if (name.length < 101 && typeof name === `string` && typeof
  idDivision === `string`) {
    const queryStrDivision = `SELECT id FROM divisions AS 'idDivision' WHERE
      name='${divisionName}';`;
    db.query(queryStrDivision, (err, results, field) => {
      if (err) { throw err; }
      if (results.length === 0) {
        res.status(400).json(`Division's name is not in database. Try again.`);
      } else {
        const { idDivision } = results[0];
        const queryStrTeam = `SELECT name FROM teams WHERE name='${name}' AND
          idDivision=${idDivision};`;
        db.query(queryStrTeam, (err, results, fields) => {
          if (err) { throw err; }
          if (results.length === 0) {
            const queryStrInsert = `INSERT INTO teams (name, totalWins, totalLosses,
              idDivision) VALUES ('${name}', 0, 0, ${idDivision});`;
            db.query(queryStrInsert, (err, results, fields) => {
              if (err) { throw err; }
              res.status(201).json(`Post team ${name} successful to ${divisionName}.`);
            });
          } else {
            res.status(400).json(`Team with that name already in this division. Try again.`);
          }
        });
      }
    });
  } else {
    res.status(400).json('Team name entries must be strings (name length < 100). Try again.');
  }
}

const getTeamsByDivision = (req, res) => {
  const { divisionName } = req.query;
  if (typeof divisionName === `string`) {
    const queryStrDivision = `SELECT id FROM divisions AS 'idDivision'
      WHERE name='${divisionName}';`;
    db.query(queryStrDivision, (err, results, fields) => {
      if (err) { throw err; }
      if (results.length === 0) {
        res.status(400).json(`Division's name is not in database. Try again.`);
      } else {
        const { idDivision } = results[0];
        const queryStr = `SELECT name, totalWins, totalLosses FROM teams WHERE
          idDivision=${idDivision};`;
        db.query(queryStr, (err, results, fields) => {
          if (err) { throw err; }
          res.status(200).json(results);
        });
      }
    });
  } else {
    res.status(400).json(`Division name required. Try again.`);
  }
}

const getSpecificTeam = (req, res) => {
  const { name, divisionName } = req.query;
  if (typeof name === `string` && typeof divisionName === `string`) {
    const queryStrDivision = `SELECT id FROM divisions AS 'idDivision' WHERE
      name='${divisionName}';`;
    db.query(queryStrDivision, (err, results, fields) => {
      if (err) { throw err; }
      if (results.length === 0) {
        res.status(400).json(`Division's name is not in database. Try again.`);
      } else {
        const { idDivision } = results[0];
        const queryStr = `SELECT name, totalWins, totalLosses FROM teams WHERE
          name='${name}' AND idDivision=${idDivision};`;
        db.query(queryStr, (err, results, fields) => {
          if (err) { throw err; }
          res.status(200).json(results);
        });
      }
    });
  } else {
    res.status(400).json(`Name and division name required. Try again.`);
  }
}

const updateSpecificTeam = (req, res) => {
  const { name, totalWins, totalLosses, divisionName, newName } = req.body;
  const numberRegex = /^[0-9]+$/;
  if (numberRegex.test(totalWins) && numberRegex.test(totalLosses) &&
  typeof name === `string` && name.length < 100 && typeof divisionName === `string`) {
    const queryStrDivision = `SELECT id FROM divisions AS 'idDivision' WHERE
      name='${divisionName}';`;
    db.query(queryStrDivision, (err, results, fields) => {
      if (err) { throw err; }
      if (results.length === 0) {
        res.status(400).json(`Division's name is not in database. Try again.`);
      } else {
        const { idDivision } = results[0];
        const queryStrSearchTeam = `SELECT id FROM teams WHERE name='${name}' AND
          idDivision=${idDivision};`;
        db.query(queryStrSearchTeam, (err, results, fields) => {
          if (err) { throw err; }
          if (results.length === 0) {
            res.status(400).json(`That team name is not in selected division. Error updating. Try again.`);
          } else {
            const { id } = results[0];
            if (newName && typeof newName === 'string' && newName.length < 100) {
              const queryStrNewName = `SELECT name FROM teams WHERE name='${newName}'
                AND idDivision=${idDivision};`;
              db.query(queryStrNewName, (err, results, fields) => {
                if (err) { throw err; }
                if (results.length === 0) {
                  const queryUpdateNewNameTeam = `UPDATE teams SET name='${newName}',
                    totalWins=${totalWins}, totalLosses=${totalLosses} WHERE id=${id}
                    AND idDivision=${idDivision};`
                  db.query(queryUpdateNewNameTeam, (err, results, fields) => {
                    if (err) { throw err; }
                    res.status(200).json(`Team ${name} update successful.`);
                  });
                } else {
                  res.status(400).json(`The new name is already taken by another team's name. Try again.`);
                }
              });
            } else {
              const queryUpdateTeam = `UPDATE teams SET totalWins=${totalWins},
                totalLosses=${totalLosses} WHERE id=${id} AND idDivision=${idDivision};`
              db.query(queryUpdateTeam, (err, results, fields) => {
                if (err) { throw err; }
                res.status(200).json(`Team ${name} update successful.`);
              });
            }
          }
        });
      }
    });
  } else {
    const message = `Name length must be less than 100. Wins and losses must be numerical. Division name must be string. Try again.`;
    res.status(400).json(message);
  }
}

module.exports = {
  addTeam,
  getTeamsByDivision,
  getSpecificTeam,
  updateSpecificTeam
};
