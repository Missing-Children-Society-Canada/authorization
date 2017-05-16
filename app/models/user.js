// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

// TODO: Save when the user was created??? 
    local            : {
        firstname    : String,
        lastname     : String,
        birthyear    : String,
        phonenumber  : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        displayName  : String,
        name         : String,
        profilepic   : String,
        gender       : String,
        birthday     : String,
        hometown     : Object,
        location     : Object,

    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String,
        profilepic   : String,
    },
    instagram           : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String,
        profilepic   : String,
    }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('social', userSchema);
