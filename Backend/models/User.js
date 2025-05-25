const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
   
});

// ✅ Prevent OverwriteModelError
const UserModel = mongoose.models.users || mongoose.model('users', UserSchema);

module.exports = UserModel;
