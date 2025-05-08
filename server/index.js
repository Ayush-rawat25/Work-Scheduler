const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const connectToMongo = require("./db");
require("./routes/auth.js");
const cors = require("cors");
connectToMongo();

const app = express();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// Middleware
app.use(session({ secret: "secret", resave: false, saveUninitialized: true, cookie: { secure: false }, sameSite:'lax' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, // needed if you're sending cookies or using sessions
}));
const taskRoutes = require("./routes/tasks");
app.use("/", taskRoutes); 


// Authentication routes
app.use(authRoutes);
app.use("/api/tasks", require('./routes/tasks'));
// Home route
app.get("/", (req, res) => {
  res.send("AI Scheduler Backend");
});

app.listen(5000, () => console.log("Server running on port 5000"));
