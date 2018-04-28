const isLoggedIn = (req, res, next) => {
  // if not logged in, redirect res.redirect('/') OR not logged in page
  console.log('hitting isLoggedIn');
  next();
}
module.exports = {
  isLoggedIn
};
