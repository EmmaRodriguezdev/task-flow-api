import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";
import { UserModel } from "./users.model";
import * as bcrypt from 'bcrypt'

export class UserProfileModel extends Model {
    public id!: number;
    public userId!: number;
    public password!: string;
    public isVerified!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
}

UserProfileModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id',
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
},
{
    sequelize,
    modelName: 'UserProfiles',
    tableName: 'user_profiles',
    timestamps: true,
    hooks: {
        beforeCreate: async (profile) => {
            profile.password = await bcrypt.hash(profile.password, 10)
            profile.createdAt = new Date()
        },
        beforeUpdate: async (profile) => {
            if (profile.changed('password')) {
                profile.password = await bcrypt.hash(profile.password, 10)
            }
            profile.updatedAt = new Date()
        }
    }
})