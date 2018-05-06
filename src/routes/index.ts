const express = require('express');

const {
  addSeason, getSeasonNames, getSpecificSeason,
  addDivision, getDivisions, getSpecificDivision,
  addTeam, getTeamsByDivision, getSpecificTeam, updateSpecificTeam
} = require('../controllers/index.ts');

const { isLoggedIn } = require('../middleware/auth.ts');
const router = express.Router();

/* -------- ROUTES -------- */
// Seasons
router.route('/seasons')
  .get(getSeasonNames)
  .post(isLoggedIn, addSeason);
router.route('/one-season')
  .get(getSpecificSeason);

// Divisions
router.route('/divisions')
  .get(getDivisions)
  .post(isLoggedIn, addDivision);
router.route('/one-division')
  .get(getSpecificDivision);

// Teams
router.route('/teams')
  .get(getTeamsByDivision)
  .post(isLoggedIn, addTeam);
router.route('/one-team')
  .get(getSpecificTeam);
router.route('/update-team')
  .put(updateSpecificTeam);

module.exports = router;
