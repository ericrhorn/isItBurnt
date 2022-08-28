
const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.userToken, 
    process.env.FIRST_SECRET_KEY,
    // once we compare the unhashed version of the cookie, run this callback function
    (err, payload) => {
    if (err) { 
      // this is not a valid token or teh cookie does not exist
      console.log("user not authenticated");
      res.status(401).json({verified: false});
    } else {
      // err is null, so it is verified correctly
      console.log("user is authenticated");
      req.jwtpayload = payload;
      next();
    }
  });
}