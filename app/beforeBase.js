/**
 * @Author: Kavin Wong
 * @Date: 2022-08-12 12:04:39
 * @LastEditTime: 2022-08-12 12:18:31
 * @Description: action before 
 */
var token = require('./auth/token');

module.exports = function(next) {
    var publicAction = ["public.create"]
    , self = this
    , c = this.req._locomotive.controller
    , a = this.req._locomotive.action
    , cRoute = c + '.' + a;

    // common start -------------------------
    this.success = function(data, msg) {
        data = data ?? {};
        msg = msg ?? 'ok';
        self.respond({
            default: function() { 
                self.res.json({ 
                    code: 200,
                    data: data,
                    msg: msg
                });
            }
        })
    }
    this.fail = function(msg, code){
        msg = msg ?? 'Fail';
        code = code ?? 400;
        self.respond({
            default: function() { 
                self.res.json({ 
                    code: code,
                    data: {},
                    msg: msg
                });
            }
        })
    }
    // common end -------------------------

    // check token
    if (publicAction.indexOf(cRoute) !== 0) {
        token.verify(this.req, function(e){
            if (e) next();
            else self.fail('auth fail', 403);
        })
    } else next()
}