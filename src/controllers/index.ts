const { addTeamToDivision, getAllTeamsByDivision } = require('./team.ts');
const { addSeason, getSeasonNames, getSpecificSeason } = require('./season.ts');
const { addDivision, getDivisions, getSpecificDivision } = require('./division.ts');

module.exports = {
  addSeason, getSeasonNames, getSpecificSeason,
  addDivision, getDivisions, getSpecificDivision,
  addTeamToDivision, getAllTeamsByDivision
}
