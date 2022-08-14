/**
 * @Author: Kavin Wong
 * @Date: 2022-08-11 12:19:37
 * @LastEditTime: 2022-08-12 15:12:55
 * @Description: book model
 */
const mongoose = require('mongoose');
const enumValues = require('mongoose-enumvalues');;

const bookSchema = new mongoose.Schema({
	name:{
		type: String,
		required: true
	},
    category:{
		type: String,
		required: true,
        enum: ["Fiction", "Comics", "Dictionary"]
	},
    price:{
		type: Number, 
        required: true,
        min: 0, 
        max: 9999999,
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

bookSchema.plugin(enumValues, {});
const Book = mongoose.model('Book', bookSchema);

/** 
 * @description: book list
 * @param {Function} callback
 * @param {Number} page
 */
Book.getBooks = (callback, page) => {
    page = page ?? 1;
    var limit = 20;
	var startLine = (page -1)*limit;
	Book.find(callback).limit(limit).skip(startLine).sort({ price: 1 });
}

/** 
 * @description: book info
 * @param {ObjectId} _id
 * @param {Function} callback
 */
Book.getInfo = (_id, callback) => {
	Book.findById(_id, callback);
}

module.exports = Book;