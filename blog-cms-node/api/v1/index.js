const express = require('express');
const router = express.Router();
const Blogschema = require('../models/blogschema');
const mongoose = require('mongoose');

router.get('/ping', (req, res) => {
	res.status(200).json({msg: 'pong', date: new Date()});
});

router.get('/blog-posts', (req, res) => {
	Blogschema.find()
		.sort({'created': -1})
		//.exec()
		.then(blogschema => res.status(200).json(blogschema))
		.catch(err => res.status(500).json({
			message: 'blog post not found',
			error: err
		}));
});

router.get('/blog-posts/:id', (req, res) => {
	const id = req.params.id;
	Blogschema.findById(id)
		.then(blogschema => res.status(200).json(blogschema))
		.catch(err => res.status(500).json({
			message: `blog post with id ${id} not found`,
			error: err
		}));
});

router.post('/blog-posts', (req, res) => {
	console.log('body', res.body);
	const blogschema = new Blogschema(req.body);
	blogschema.save((err, blogschema) => {
		if (err) {
			return res.status(500).json(err);
		}
		res.json(blogschema);
	});
});
  
router.delete('/blog-posts/:id', (req, res) => {
	const id = req.params.id;
	Blogschema.findByIdAndDelete(id, (err, blogschema) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(202).json({
			message: `blog post with id ${blogschema._id} deleted`,
		});
	});

});

router.delete('/blog-posts', (req, res) => {
	const ids = req.query.ids;
	console.log(ids);
	const allIds = ids.split(',').map(id => {
		if(id.match(/^[0-9a-fA-F]{24}$/)){
			return mongoose.Types.ObjectId(id);
		}else {
			console.log('id non valide ', id);
		}
	});

	const condidtion = {_id: {$in : allIds }};
	Blogschema.deleteMany(condidtion , (err, result) => {
		if(err){
			res.status(500).json(err);
		}
		res.status(202).json(result);
	});
});




module.exports = router;

