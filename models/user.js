var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passPortLocalMongoose=require("passport-local-mongoose")

var User = new Schema({
    admin:   {
        type: Boolean,
        default: false
    }
});

User.plugin(passPortLocalMongoose);
module.exports = mongoose.model('User', User);