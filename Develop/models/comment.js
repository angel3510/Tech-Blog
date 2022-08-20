const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection")

class Comment extends Model{

}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "post",
                key: "id"
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        //passes the connection
        sequelize,
        //handle our created at
        timestamps: true,
        updatedAt: false,
        freezeTableName: true,
        underscored: true,
        //table name
        modelName: "comment"
    }
)


module.exports = Comment;