const JWT = require("jsonwebtoken");
const Cart = require("../models/Cart");

const verifyToken = (req,res,next) => {
  const authHeader = req.headers.token

  if(authHeader){
    const token = authHeader.split(" ")[1]
    JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
      if(err) res.status(401).json("Token is not valid.");
      req.user = user;
      next()
    });
  } else {
    return res.status(401).json("You are not authenticated.");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.id)
    console.log(req.params.id)

    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("Not authorized.");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("Not authorized.");
    }
  });
};


const verifyTokenAndGetCartAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.id)
    console.log(req.params.id)
    console.log(req.body)

    if (req.user.id === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("Not authorized.");
    }
  });
};

const verifyTokenAndCartUpdateAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.id)
    console.log(req.body.userId)
    console.log(req.params.id)
    if (req.user.id === req.body.userId || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("Not authorized.");
    }
  });
};

const verifyTokenAndDeleteCartAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.id)
    console.log(req.params.id)
    console.log(req.user)

    if (req.user.id === req.body.userId && req.params.id === req.body.cartId || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("Not authorized.");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndCartUpdateAuthorization, verifyTokenAndGetCartAuthorization,
verifyTokenAndDeleteCartAuthorization };