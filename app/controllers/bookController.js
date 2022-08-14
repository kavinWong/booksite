/**
 * @Author: Kavin Wong
 * @Date: 2022-08-11 18:12:17
 * @LastEditTime: 2022-08-12 12:27:42
 * @Description: book controller
 */

 var locomotive = require('locomotive')
 , Controller = locomotive.Controller
 , bookController = new Controller()
 , beforeBase = require('../beforeBase')
 , Book = require('../models/book');

bookController.before('*', beforeBase);

/** 
 * @description: book list
 * @param {Number} page
 * @return {Object}
 */    
bookController.index = function() {
    var self = this;
    Book.getBooks(function(err,res){
        self.success(res);
    }, this.req.query.page)
}

/** 
 * @description: book info
 * @param {String} _id
 * @return {Object}
 */
bookController.show = function(){
    var self = this;
    Book.getInfo(this.req.params['id'], function(err,res){
        if (err) {
            self.fail('Null Data', 404);
        } else {
            self.success(res);
        }
    })
}

module.exports = bookController;
