/**
 * @Author: Kavin Wong
 * @Date: 2022-08-11 20:55:29
 * @LastEditTime: 2022-08-12 12:21:07
 * @Description: public controller
 */


 var locomotive = require('locomotive')
 , Controller = locomotive.Controller
 , publicController = new Controller()
 , beforeBase = require('../beforeBase')
 , User = require('../models/user')
 , token = require('../auth/token');

publicController.before('*', beforeBase);

/** 
 * @description: create test user
 */
publicController.create = function() {
    var self = this
    , name = 'siteuser_' + (new Date()).valueOf();

    User.addUser(name, function(err, e){
        if (err) {
            self.fail('request fail', 500);
        } else {
            self.success({token: token.sign(e._id)}, 'login success');
        }
    })
}

module.exports = publicController;
