/**
 * @Author: Kavin Wong
 * @Date: 2022-08-11 10:45:31
 * @LastEditTime: 2022-08-12 15:13:04
 * @Description: user model
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model('User', userSchema);

/** 
 * @description: find user by id
 * @param {ObjectId} id
 * @param {Function} callback
 */
User.getUserById = (id, callback) => {
	User.findById(id, callback);
}

/** 
 * @description: add user
 * @param {String} name
 * @param {Function} callback
 */
User.addUser = (name, callback) => {
	User.create({name:name}, callback);
}

module.exports = User;