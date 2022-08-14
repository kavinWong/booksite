var express = require('express')
  , CORS = require('connect-cors')
  , poweredBy = require('connect-powered-by')
  , options = {
        origins: ['*']                       // implicit same as ['*'], and null
      , methods: ['HEAD', 'GET', 'POST', 'PUT', 'DELETE']  // OPTIONS is always allowed
      , headers: [                        // both `Exposed` and `Allowed` headers
            'X-Requested-With'
          , 'X-HTTP-Method-Override'
          , 'Content-Type'
          , 'Accept'
		  , 'Authorization'
        ]
      , credentials: false                // don't allow Credentials
      , resources: [
          {
              pattern: '/'                // a string prefix or RegExp
          //, origins
          //, methods
          //, headers
          //, credentials
          }
        ]
    };

module.exports = function() {
  // Use middleware.  Standard [Connect](http://www.senchalabs.org/connect/)
  // middleware is built-in, with additional [third-party](https://github.com/senchalabs/connect/wiki)
  // middleware available as separate modules.
  if ('development' == this.env) {
    this.use(express.logger());
  }
  
  this.use(CORS(options));
  this.use(poweredBy('Locomotive'));
  this.use(express.favicon());
  this.use(express.static(__dirname + '/../../public'));
  this.use(express.bodyParser());
  this.use(express.methodOverride());
  this.use(this.router);
 
  this.use(express.errorHandler());
}
