const { addPlayer, getPlayersForDivision, getPlayersForTeam, getSpecificPlayer, updateSpecificPlayer } = require('./player.ts');
const { addTeam, getTeamsByDivision, getSpecificTeam, updateSpecificTeam } = require('./team.ts');
const { addDivision, getDivisions, getSpecificDivision } = require('./division.ts');
const { addSeason, getSeasonNames, getSpecificSeason } = require('./season.ts');

module.exports = {
  addPlayer, getPlayersForDivision, getPlayersForTeam, getSpecificPlayer, updateSpecificPlayer,
  addTeam, getTeamsByDivision, getSpecificTeam, updateSpecificTeam,
  addDivision, getDivisions, getSpecificDivision,
  addSeason, getSeasonNames, getSpecificSeason
}
