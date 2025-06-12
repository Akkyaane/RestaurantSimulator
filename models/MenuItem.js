const db = require('../config/db');


const getAllMenuItems = async () => {
  try {
    const [results] = await db.query('SELECT * FROM menu_items');
    return results;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAllMenuItems,
};
