var jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
, User = require('../models/user')
, config = require('../../config/initializers/00_generic'); // get our config file

var Token = {};
/** 
 * @description: verify token
 * @param {Object} req
 * @param {Function} callback
 */
Token.verify = function(req, callback) {
    // check header or url parameters or post parameters for token
    var token = null;
    for (var key of req.rawHeaders) {
        if (key == 'Authorization') token = '';
        else if (token === '') {
            token = key;
            break;
        }
    }
    
    if (!token) return callback(false);

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
        if (err) return callback(false);
        
        User.getUserById(decoded.id, function(e, u){
            if (e || !u) return callback(false);
            // if everything is good, save to request for use in other routes
            req.user = u;
            callback(true);
        })
    });
}

/** 
 * @description: create token
 * @param {String} userId
 * @return {String} token string
 */
Token.sign = function(userId) {
    return jwt.sign({ id: userId }, config.secret, {
        expiresIn: 86400*30 // expires in 1 month
    });
}

module.exports = Token;