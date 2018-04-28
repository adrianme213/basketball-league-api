const express = require('express');

const {} = require('../controllers/index.ts');

const router = express.Router();

// // Authorization route for login
// router.route('/users/auth')
//   .post(authUser);
router.route('/teams/signup')
  .post()

module.exports = router;
