const checkAuthentication = (req, res, next) => {
  console.log("req,", req.headers);
  const session = req.headers.session;
  console.log("req.headers.session", req.headers.session);
  if (!session) {
    res.status(401).json({
      message: "session expired",
    });
  } else {
    req.user = {
      username: "ariefardi",
      role: "super-admin",
    };
    next();
  }
};

module.exports = checkAuthentication;
