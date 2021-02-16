'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Links', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            linkName: {
                type: Sequelize.STRING,
            },
            linkUrl: {
                type: Sequelize.STRING,
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'userId',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Links');
    },
};
