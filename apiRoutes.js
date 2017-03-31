const express = require('express');

const router = express.Router();

const Blog = require('./blog')


// body parser 
const parser = require('body-parser');

//parses requests with the content type of `application/json`
router.use(parser.json());


router.get('/posts',(request, response, next) => {
	next();
});

router.get('/redirect',(request, response, next) => {
	response.redirect('./admin.html')
	next();
});


// post post
router.post('/posts', (request, response, next) => {
	const requestBody = request.body;

	// Add a post
	Blog.createItem(requestBody);

	next();

});

// put post
router.put('/post/:id', (request, response, next) => {
	const id = parseInt(request.params.id, 10);
	const dataPayload = request.body;

	Blog.updateItem(id, 'data.isDone', dataPayload.isDone);

	next();
}); // post

// delete post
router.delete('/post/:id', (request, response, next) => {
	const id = parseInt(request.params.id, 10);
	Blog.deleteItem(id);

	next();
}); // delete

router.use((request, response) => {
	response.header('Content-Type', 'application/json');
	response.send(Blog.getItems());	
});

module.exports = router;