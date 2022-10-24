'use strict';
import { randomUUID } from 'crypto';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Filters', [
            {
                id: randomUUID(),

                clicks: 0,
                userInfo: {
                    type: DataTypes.STRING,
                },
                link: 'https://www.youtube.com/watch?v=03E_hZdXqBE',
                shortcut: 'jdasouewnl',
                version: 0,
                createdAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
