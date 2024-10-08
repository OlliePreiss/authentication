const { query } = require('express')
const { body, validationResult } = require('express-validator');
const db = require('../db/query');

async function userListGet(req, res) {
  const users = await db.getAllUsers();
  console.log("Users:", users);
  res.send("Users:" + users.map(user => user.username).join(", "));
};

async function userCreateGet(req, res)  {
  res.render("createUser");
}

async function userCreatePost(req, res) {
  const { username } = req.body;
  await db.insertUser(username);
  res.redirect("/");
}

module.exports = {
  userListGet,
  userCreateGet,
  userCreatePost
}
