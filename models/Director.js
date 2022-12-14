const mongoose = require('mongoose');
const schema = mongoose.Schema;

const DirectorSchema = new schema({
    name: {
		type: String,
		maxlength: 60,
		minlength: 2
	},
	surname: {
		type: String,
		maxlength: 60,
		minlength: 2
	},
	bio: {
		type: String,
		maxlenght: 1000,
		minlength: 60
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('director', DirectorSchema);