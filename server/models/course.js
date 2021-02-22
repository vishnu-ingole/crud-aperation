
module.exports = (sequelize, Sequelize) => {
  const course = sequelize.define('course', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    professor_name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,

    },

  });

  return course;
}
