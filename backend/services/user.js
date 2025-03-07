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
    text: ` SELECT s.id,
            s.email,
            s.first_name as firstName,
            s.last_name as lastName,
            country,
            city,
            phone_number as phoneNumber
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
            phone_number as phoneNumber
          FROM users s
          WHERE id = $1`,
    values: [id],
  };

  const { rows } = await db.query(queryText);
  
  if (rows[0]) {
    const user = rows[0];
    return user;
  }

  throw new Error('User not found');
}

const update = async (id, {email, firstName, lastName, country, city, phoneNumber}) => { 
    const queryText = {
      text: `UPDATE users SET 
              email = $2,
              first_name = $3,
              last_name = $4,
              country = $5,
              city = $6,
              phone_number = $7
            WHERE
              id = $1`,
      values: [id, email, firstName, lastName, country, city, phoneNumber],
    };
    
    await db.query(queryText);
}

// TODO : implement soft delete to prevent accidental deletion and allow recovery
const deleteAccount = async (id) => {
  const queryText = {
    text: `DELETE FROM users WHERE id = $1`,
    values: [id],
  };
  
  await db.query(queryText);
}

module.exports = {
  authenticateUser,
  getById,
  update,
  deleteAccount
};
