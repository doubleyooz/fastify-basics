import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const Link = sequelize.define('Link', {
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    clicks: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userInfo: {
        type: DataTypes.STRING,
       
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    version: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});