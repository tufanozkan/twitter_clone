module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments",{
        commentBody: {
        type: DataTypes.STRING,
        allowull: false,
        },
    });
    
    return Comments;
};