const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required : true,
    },
    
    lastName : {
        type: String,
        required : true,
    },
    
    email : {
        type: String,
        required : true,
        isUnique: true,
    },
    
    password : {
        type: String,
        required : true,
    },
    DoB : {
        type: Date,
        required : true,
    },
    
    isVerified : {
        type: Boolean,
        required : true,
        default: false,
    },
    
},{
    timestamps: true,
});

module.exports = mongoose.model('userLogin', userSchema)
