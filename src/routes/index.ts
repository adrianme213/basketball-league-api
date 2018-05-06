const express = require('express');

const {
  addPlayer, getPlayersForDivision, getPlayersForTeam, getSpecificPlayer, updateSpecificPlayer,
  addTeam, getTeamsByDivision, getSpecificTeam, updateSpecificTeam,
  addDivision, getDivisions, getSpecificDivision,
  addSeason, getSeasonNames, getSpecificSeason
} = require('../controllers/index.ts');
const { isLoggedIn } = require('../middleware/auth.ts');

const router = express.Router();
/* -------- ROUTES -------- */
// Players
router.route('/player')
  .get(getSpecificPlayer)
  .put(updateSpecificPlayer);
router.route('/players-by-team')
  .get(getPlayersForTeam)
  .post(isLoggedIn, addPlayer);
router.route('/players-by-division')
  .get(updateSpecificTeam);

// Teams
router.route('/teams-by-division')
  .get(getTeamsByDivision)
  .post(isLoggedIn, addTeam);
router.route('/team')
  .get(getSpecificTeam)
  .put(updateSpecificTeam);

// Divisions
router.route('/divisions-by-season')
  .get(getDivisions)
  .post(isLoggedIn, addDivision);
router.route('/division')
  .get(getSpecificDivision);

// Seasons
router.route('/all-seasons')
  .get(getSeasonNames)
  .post(isLoggedIn, addSeason);
router.route('/season')
  .get(getSpecificSeason);

module.exports = router;
