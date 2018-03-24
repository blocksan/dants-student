let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let postSchema = new Schema({
    "searchkey": {
        type: String,
        "trim": true,
    },
    "searchalias": String,
    "searchresult": {
        "type": String,
        "trim": true,
    },
    "dateadded": {
        "type": String,
    },
    "user": {
        type: Schema.ObjectId,
        ref: 'users'
    },
    "codeurl": {
        "type": String
    }
});

let searchdata = mongoose.model('searchdata', postSchema)
module.exports = {
    searchdata: searchdata
}