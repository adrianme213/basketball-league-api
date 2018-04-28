const express = require('express');

const { addTeamToDivision, getAllTeamsByDivision } = require('../controllers/index.ts');
const { isLoggedIn } = require('../middleware/auth.ts');
const router = express.Router();

// Routes
router.route('/teams')
  .get(getAllTeamsByDivision)
  .post(isLoggedIn, addTeamToDivision);

module.exports = router;
