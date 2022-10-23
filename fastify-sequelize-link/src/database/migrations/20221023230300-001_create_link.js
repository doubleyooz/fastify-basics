'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'Links', // table name
                'id', // new field name
                {
                    type: Sequelize.UUIDV$,
                    allowNull: false,
                },
            ),
            queryInterface.addColumn(
                'Links', // table name
                'createdAt', // new field name
                {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
            ),

            queryInterface.addColumn('Links', 'clicks', {
                type: Sequelize.INTEGER,
                allowNull: false,
            }),
            queryInterface.addColumn('Links', 'userInfo', {
                type: Sequelize.TEXT,
                allowNull: true,
            }),
            queryInterface.addColumn('Links', 'link', {
                type: Sequelize.TEXT,
                allowNull: false,
            }),
            queryInterface.addColumn('Links', 'userInfo', {
                type: Sequelize.INTEGER,
                allowNull: true,
            }),
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Links');
    },
};
