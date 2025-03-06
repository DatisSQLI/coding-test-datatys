const shajs = require('sha.js');
const db = require('../sql/db');

const SECRET = process.env.SECRET || 'test-dev-secret';
/**
 * Generate hash password
 * Generate online: https://emn178.github.io/online-tools/sha256.html
 * @param {string} email
 * @param {string} password
 */
const hashPassword = (email, password) => shajs('sha256').update(`${email}${password}${SECRET}`).digest('hex');

const authenticateUser = async (email, password) => {
  const hash = hashPassword(email, password);
  const queryText = {
    text: ` SELECT s.id, s.email, s.first_name as firstName, s.last_name as lastName
              FROM users s
              WHERE email = $1 AND password = $2`,
    values: [email, hash],
  };
  try {
    const { rows } = await db.query(queryText);
    if (rows[0]) {
      const user = rows[0];
      return user;
    }
    throw (new Error('Bad credentials'));
  } catch (error) {
    throw (new Error('Bad credentials'));
  }
};

const getById = async (id) => {
  const queryText = {
    text: `SELECT
            s.id,
            s.email,
            s.first_name as firstName,
            s.last_name as lastName,
            country,
            city,
            phone_number
          FROM users s
          WHERE id = $1`,
    values: [id],
  };
  try {
    const { rows } = await db.query(queryText);
    
    if (rows[0]) {
      const user = rows[0];
      return user;
    }
    throw (new Error('User not found'));
  } catch (error) {
    throw (new Error('User not found'));
  }
}

module.exports = {
  authenticateUser,
  getById
};
