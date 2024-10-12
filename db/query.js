const pool = require("./pool");

async function getAllUsers() {
  const { rows } = await pool.query(`SELECT * FROM users`);
  return rows;
}

async function findUsers(searchterm) {
  const { rows } = await pool.query(`
    SELECT *
    FROM users
    WHERE user LIKE $1`,[`%${searchterm}%`]);
  return rows;
}

async function insertUser(user) {
  await pool.query("INSERT INTO users (user) VALUES ($1)", [user])
}

async function deleteUsers() {
  await pool.query("DELETE FROM users")
}

module.exports = {
  getAllUsers,
  findUsers,
  insertUser,
  deleteUsers
};
