const { addTeamToDivision, getAllTeamsByDivision } = require('./team.ts');
const { addSeason, getSeasonNames, getSpecificSeason } = require('./season.ts');

module.exports = {
  addSeason, getSeasonNames, getSpecificSeason,
  addTeamToDivision, getAllTeamsByDivision
}
