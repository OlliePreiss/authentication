const { Pool } = require('pg');
const express = require('express');
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const path = require('node:path')
const userRouter = require('./routes/userRouter')
const PORT = process.env.PORT || 3005;
require("dotenv").config();

const pool = new Pool ({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: "top_users",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users where username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username"});
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }))
app.use(passport.session())
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.get('/sign-up', (req,res) => res.render("sign-up-form"));
app.post('/sign-up', async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
        req.body.username,
        hashedPassword,
      ]);
    })
    res.redirect("/");
  } catch(err) {
    return next(err);
  }
})

app.get("/log-in", (req, res) => res.render("log-in-form"));
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(PORT, () => console.log("app listening on port 3005"));
