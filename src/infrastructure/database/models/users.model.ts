import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config/database";
import { UserProfileModel } from "./users-profiles.model";

export class UserModel extends Model {
    public id!: number;
    public name!: string;
    public lastName!: string;
    public email!: string;
    public phone!: string;
    public profile!: UserProfileModel;
    public createdAt!: Date;
    public updatedAt!: Date;
}

UserModel.init({
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
