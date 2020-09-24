const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 5
    },
    year: { type: Number, required: true },
    runtime: {type: Number, required: true },
    genres: { type: [Object], required: true },
    adult: { type: Boolean, required: true },
    engmntLevel: { type: Number, required: true },
    favorites: { type: [Object] }
})

const User = mongoose.model(`User`, userSchema);

module.exports = User;