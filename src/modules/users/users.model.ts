import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/database";
import { UserProfiles } from "./users-profiles.model";

export class User extends Model {
    public id!: number;
    public name!: string;
    public lastName!: string;
    public email!: string;
    public phone!: string;
    public profile!: UserProfiles;
    public createdAt!: Date;
    public updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
});
