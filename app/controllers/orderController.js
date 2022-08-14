/**
 * @Author: Kavin Wong
 * @Date: 2022-08-11 22:29:23
 * @LastEditTime: 2022-08-12 15:18:25
 * @Description: order controller
 */
 var locomotive = require('locomotive')
 , Controller = locomotive.Controller
 , orderController = new Controller()
 , beforeBase = require('../beforeBase')
 , Order = require('../models/order')
 , Book = require('../models/book');
 
orderController.before('*', beforeBase);

/** 
 * @description: create order
 * @param {String} book_id: book model ObjectId
 * @param {String} customer: customer name
 * @param {String} phone: phone number
 */
orderController.create = function() {
    if (!this.req.body['book_id']) return this.fail('"book_id" is null.');
    if (!this.req.body['customer']) return this.fail('customer name is null.');
    if (!this.req.body['phone']) return this.fail('phone number is null.');
    
    var self = this
    , params = {
        book_id: this.req.body['book_id'],
        customer: this.req.body['customer'],
        phone: this.req.body['phone'],
        user_id: self.req.user._id
    }

    // find book
    Book.getInfo(params.book_id, function(err, b){
        if (err) return self.fail('The book does not exist.');
        // data redundancy
        params.book_name = b.name;
        params.book_category = b.category;
		params.amount = b.price;
        Order.createBookOrder(params, function(err, o){
            if (err) return self.fail('Create fail.');
            self.success({order_id:o._id}, 'Create success.');
        })
    })
    
}


orderController.show = function(){
 var self = this;
 Order.getInfo(this.req.params['id'], this.req.user._id, function(err,res){
     if (err) {
        self.fail('Null Data', 404);
     } else {
        self.success(res);
     }
 })
}

module.exports = orderController;
