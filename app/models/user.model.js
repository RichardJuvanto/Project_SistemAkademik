const { Schema } = require("mongoose");
const { softDeletePlugin } = require("soft-delete-plugin-mongoose")
module.exports = (mongoose) => {

    const UserSchema = mongoose.Schema({
        nama: String,
        username: String,
        email: String,
        password: String,
    }, {
        timestamps: true
    });
    UserSchema.plugin(softDeletePlugin);
    const User = mongoose.model("user", UserSchema);
    return User;
}