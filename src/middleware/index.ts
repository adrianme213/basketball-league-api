const logTimeUrl = (req, res, next) => {
  if (req.url !== `/favicon.ico`) {
    const date = new Date(Date.now());
    console.log(`Time: ${date.toLocaleTimeString("en-US")} - Serving request ${req.method} at ${req.url}`);
  }
  next()
}

module.exports = logTimeUrl;
