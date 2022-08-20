const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model{

}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "User",
                key: "id"
            }
        }
    },
    {
        //passes the connection
        sequelize,
        //handle our created at column here
        timestamps: true,
        updatedAt: false,
        freezeTableName: true,
        underscored: true,
        //table name
        modelName: "post"        
    } 
)

module.exports = Post