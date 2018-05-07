const { addPlayer, getPlayersByDivision, getPlayersByTeam, getSpecificPlayer, updateSpecificPlayer } = require('./player.ts');
const { addTeam, getTeamsByDivision, getSpecificTeam, updateSpecificTeam } = require('./team.ts');
const { addDivision, getDivisions, getSpecificDivision } = require('./division.ts');
const { addSeason, getSeasonNames, getSpecificSeason } = require('./season.ts');

module.exports = {
  addPlayer, getPlayersByDivision, getPlayersByTeam, getSpecificPlayer, updateSpecificPlayer,
  addTeam, getTeamsByDivision, getSpecificTeam, updateSpecificTeam,
  addDivision, getDivisions, getSpecificDivision,
  addSeason, getSeasonNames, getSpecificSeason
}
