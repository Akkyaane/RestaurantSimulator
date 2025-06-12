const menuModel = require('../models/MenuItem');

const getMenu = async (req, res) => {
  try {
    const items = await menuModel.getAllMenuItems();

    const menu = [];

    const categoryMap = {
      1: 'Entrées',
      2: 'Plats principaux',
      3: 'Desserts'
    };

    const grouped = {};

    items.forEach((item) => {
      const categoryName = categoryMap[item.category_id];
      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }
      grouped[categoryName].push({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price
      });
    });

    for (const [name, dishes] of Object.entries(grouped)) {
      menu.push({ name, dishes });
    }

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