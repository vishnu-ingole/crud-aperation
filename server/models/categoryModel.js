module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define('category', {
    categoryId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,

    },
    categoryName: {
      type: Sequelize.STRING,
    }

  });

  return category;
}

