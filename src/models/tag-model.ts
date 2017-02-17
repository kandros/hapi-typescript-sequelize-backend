import {Sequelize, DataTypes} from 'sequelize'

export default function(sequelize: Sequelize, Types: DataTypes) {
    const Tag = sequelize.define("Tag", {
        name: {
            type: Types.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        // classMethods: {
        //     associate: function(models) {
        //         User.hasMany(models.Task)
        //     }
        // }
    });

    return Tag;
};