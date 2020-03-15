const { Schema, model } = require('mongoose')

const schema = new Schema({
    id      : { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    token   : { type: Object }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model('User', schema)
