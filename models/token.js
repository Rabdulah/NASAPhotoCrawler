var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    tokenData: {
		type: String,
		required: true
    },
	userId: {
	    type: mongoose.SchemaTypes.ObjectId
	}
});

var Model = mongoose.model('tokens', schema);
module.exports = Model;