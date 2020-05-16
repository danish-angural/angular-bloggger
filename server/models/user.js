const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name:{type: String}
}, {collection: 'user'});

const User = mongoose.model('User', userSchema);
module.exports= User;