const checkRoleSuperAdmin = (req, res, next) => {
  if (req.user.role === "super-admin") {
    next();
  } else {
    res.json({
      message: "Sorry you cant hit this api",
    });
  }
};

module.exports = checkRoleSuperAdmin;
