const express = require('express');

const {
  addSeason, getSeasonNames, getSpecificSeason,
  addTeamToDivision, getAllTeamsByDivision
} = require('../controllers/index.ts');

const { isLoggedIn } = require('../middleware/auth.ts');
const router = express.Router();

/* -------- ROUTES -------- */
// Seasons
router.route('/seasons')
  .get(getSeasonNames)
  .post(isLoggedIn, addSeason);
router.route('/one-season')
  .get(getSpecificSeason)

// Teams
router.route('/teams')
  .get(getAllTeamsByDivision)
  .post(isLoggedIn, addTeamToDivision);

module.exports = router;
