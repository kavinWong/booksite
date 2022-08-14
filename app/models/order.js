const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Book = require('./book');
const User = require('./user');
const moment = require('moment');

const orderSchema = new Schema({
	order_num:{
		type: String,
		required: true
	},
	book_id:{
		type: Schema.Types.ObjectId,
		ref: 'Book',
		required: true
	},
	user_id:{
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	book_name:{
		type: String,
		required: true
	},
	book_category:{
		type: String,
		required: true
	},
	amount:{
		type: Number, 
	    required: true,
	    min: 0, 
	    max: 9999999,
	},
	customer:{
		type: String,
		required: true,
		maxLength:50
	},
	phone:{
		type: String,
		required: true,
		match:/^[0-9]+$/,
		minLength: 8,
		maxLength: 8,
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Order = mongoose.model('Order', orderSchema);

/** 
* @description: create order
* @param {Object} params
* @param {Function} callback
*/
Order.createBookOrder = (params, callback) => {
	var randNum = Math.floor(Math.random()*8999)+1000;
	params.order_num = moment().format('YYYYMMDD') + randNum;
	Order.create(params, callback);
}

/** 
 * @description: 
 * @param {ObjectId} id
 * @param {ObjectId} user_id
 * @param {Funtion} callback
 */
Order.getInfo = (id, user_id, callback) => {
	Order.findOne({ _id: id, user_id: user_id}, callback);
}

module.exports = Order;