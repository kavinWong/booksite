/**
 * @Author: Kavin Wong
 * @Date: 2022-08-10 22:07:19
 * @LastEditTime: 2022-08-11 19:39:08
 * @Description: mongoDB config
 */
var mongoose = require('mongoose');

module.exports = function() {
  // test datebase
  var connectStr = 'mongodb://kavin_share:kFAzRbLkekhO3hMb@ac-bcito6k-shard-00-00.smib4dh.mongodb.net:27017,ac-bcito6k-shard-00-01.smib4dh.mongodb.net:27017,ac-bcito6k-shard-00-02.smib4dh.mongodb.net:27017/?ssl=true&replicaSet=atlas-hlsbme-shard-0&authSource=admin&retryWrites=true&w=majority';

  switch (this.env) {
    case 'development':
      mongoose.connect(connectStr);
      break;
    case 'production':
      mongoose.connect(connectStr);
      break;
  }
}
