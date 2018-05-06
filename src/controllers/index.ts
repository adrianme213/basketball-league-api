const { addSeason, getSeasonNames, getSpecificSeason } = require('./season.ts');
const { addDivision, getDivisions, getSpecificDivision } = require('./division.ts');
const { addTeam, getTeamsByDivision, getSpecificTeam, updateSpecificTeam } = require('./team.ts');

module.exports = {
  addSeason, getSeasonNames, getSpecificSeason,
  addDivision, getDivisions, getSpecificDivision,
  addTeam, getTeamsByDivision, getSpecificTeam, updateSpecificTeam
}
