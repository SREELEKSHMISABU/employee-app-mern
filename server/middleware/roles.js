exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: `User role ${req.user.role} not authorized` });
      }
      next();
    };
  };