function fetchUser(req, res, next) {
    if (req.isAuthenticated()) {
      // User is logged in
      req.userId = req.user._id; // or req.user.googleId or whatever you store
      return next();
    } else {
      return res.status(401).json({ error: "Unauthorized: Please log in" });
    }
  }
  
module.exports = fetchUser;