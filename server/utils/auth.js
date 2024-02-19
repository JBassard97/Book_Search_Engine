const jwt = require("jsonwebtoken");

// set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  // function for our authenticated routes
  // ! enclosed req, res in {} as GraphQL context, which contains those objects
  authMiddleware: function ({ req, res }, next) {
    // allows token to be sent via  req.query or headers
    //  ? commented out V V V
    // let token = req.query.token || req.headers.authorization;
    // ! extract token from request headers or context:
    let token = req.headers.authorization || "";

    // ? commented out V V V
    // ["Bearer", "<tokenvalue>"]
    // if (req.headers.authorization) {
    //   token = token.split(' ').pop().trim();
    // }

    token = token.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({ message: "You have no token!" });
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
      return res.status(400).json({ message: "invalid token!" });
    }

    // send to next endpoint
    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
