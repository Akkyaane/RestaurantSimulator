const menuModel = require('../models/MenuItem');

const getMenu = async (req, res) => {
  try {
    const items = await menuModel.getAllMenuItems();

    const menu = {
      entrées: [],
      plats: [],
      desserts: [],
      boissons: [],
    };

    const categoryMap = {
      2: 'entrées',
      1: 'plats',
      3: 'desserts',
      4: 'boissons',
    };

    items.forEach((item) => {
      const categoryName = categoryMap[item.category_id];
      if (menu[categoryName]) {
        menu[categoryName].push(item);
      }
    });

    res.status(200).json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération du menu.' });
  }
};

module.exports = {
  getMenu
};