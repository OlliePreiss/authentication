const pool = require("./pool");

async function getAllUsers() {
  const { rows } = await pool.query(`SELECT * FROM usernames`);
  return rows;
}

async function findUsers(query) {
  const { rows } = await pool.query(`
    SELECT *
    FROM usernames
    WHERE username LIKE $1`,[`%${query}%`]);
  return rows;
}

async function insertUser(user) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [user])
}

module.exports = {
  getAllUsers,
  findUsers,
  insertUser
};
