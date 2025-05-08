const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { google } = require("googleapis");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { getCalendarEvents } = require("../calendar");
const User = require('../models/User')
const router = express.Router();

// Configure passport to use Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      // Save the user's profile and tokens for later API access
      try{
        let user = await User.findOne({googleId:profile.id});

        if(user){
          user.accessToken= accessToken;
          user.refreshToken= refreshToken;
          user.updatedAt = new Date();
          await user.save();
        }
        else{
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            accessToken,
            refreshToken,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          await user.save();
        }
        return done(null, user);
      }catch(err){
        console.log("Unable to Save data to DB:", err);
        return done(err, null);
      }
      
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Fetch full user from DB
    done(null, user); // attaches user to req.user
  } catch (err) {
    done(err, null);
  }
});

// Google login route
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile","email",'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events']
  })
);

//Validate token: 
// const axios = require('axios');

// async function validateAccessToken(accessToken) {
//   try {
//     const response = await axios.get(
//       `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
//     );
//     console.log('Token is valid:', response.data);
//   } catch (error) {
//     console.error('Invalid access token:', error.response.data);
//   }
// }
// Google callback route
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      // validateAccessToken(req.user.accessToken);
      res.redirect(`http://localhost:3000`);
    } catch (error) {
      console.error("Error fetching calendar events:", error.response ? error.response.data : error.message);
      res.status(500).send("Error fetching events.");
    }
  }
);

router.get("/api/events", async (req, res) => {
  if (!req.user || !req.user.accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const events = await getCalendarEvents(req.user.accessToken);
    res.json(events);
  } catch (error) {
    console.error("Error fetching calendar events:", error.message);
    res.status(500).json({ error: "Error fetching events" });
  }
});

router.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user }); // send the user data to frontend
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});



module.exports = router;
