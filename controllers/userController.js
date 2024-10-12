const { query } = require('express')
const { body, validationResult } = require('express-validator');
const db = require('../db/query');
const { search } = require('../routes/userRouter');

async function userListGet(req, res) {
  users = !req.query.search ? await db.getAllUsers() : await db.findUsers(req.query.search);
  console.log("Users:", users);
  res.send("Users:" + users.map(user => user.username).join(", "));
};

async function userCreateGet(req, res)  {
  // res.render("createUser");
}

async function userCreatePost(req, res) {
  const { username } = req.body;
  await db.insertUser(username);
  res.redirect("/");
}

async function userDeleteGet(req, res) {
  db.deleteUsers();
  console.log("Users deleted");
  res.redirect("/");
}

module.exports = {
  userListGet,
  userCreateGet,
  userCreatePost,
  userDeleteGet
}
