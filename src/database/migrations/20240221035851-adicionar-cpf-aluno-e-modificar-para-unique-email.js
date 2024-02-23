module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('alunos', 'cpf', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.changeColumn('alunos', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down: async () => {
    // Implemente o código para reverter as alterações se necessário
  },
};
