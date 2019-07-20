const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: String,
	subTitle: String,
	image: String,
	content: String,
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('blogSchema', blogSchema); 