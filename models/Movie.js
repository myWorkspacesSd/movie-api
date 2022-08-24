const mongoose = require('mongoose');
const schema = mongoose.Schema;

const MovieSchema = new schema({
    directorId:{
      type: schema.Types.ObjectId,
    },
    title:{
        type: String,
        required: true
    },
    category: {
    	type: String
		},
    country: {
			type: String,
		},
    year: {
    	type: Number,
		},
    imdb_score: {
    	type: Number,
		},
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);