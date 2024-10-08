const pool = require("./pool");

async function getAllUsers() {
  const { rows } = await pool.query(`SELECT * FROM usernames`);
  return rows;
}

async function findUsers(searchterm) {
  const { rows } = await pool.query(`
    SELECT *
    FROM usernames
    WHERE username LIKE $1`,[`%${searchterm}%`]);
  return rows;
}

async function insertUser(user) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [user])
}

async function deleteUsers() {
  await pool.query("DELETE FROM usernames")
}

module.exports = {
  getAllUsers,
  findUsers,
  insertUser,
  deleteUsers
};
