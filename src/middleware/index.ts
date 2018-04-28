const logTimeUrl = (req, res, next) => {
  if (req.url !== `/favicon.ico`) {
    const date = new Date(Date.now());
    console.log(`Time: ${date.toLocaleTimeString("en-US")} - Serving request ${req.method} at ${req.url}`);
  }
  next()
}


const setHeaders = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_HOST || 'http://localhost:1337');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

// Express sessions - requires express-session
// const sessionChecker = session({
//   secret: process.env.SESSION_SECRET || 'get dat paper yo',
//   saveUninitialized: true,
//   resave: false,
//   store: new RedisStore({
//     host: process.env.REDIS_HOST || 'localhost',
//     port: process.env.REDIS_PORT || 6379,
//     ttl: 3600,
//     client,
//   }),
//   proxy: true,
// });


exports.logTimeUrl = logTimeUrl;
exports.setHeaders = setHeaders;
