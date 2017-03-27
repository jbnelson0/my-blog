// grab db
const low = require('lowdb');
// instantiate db
const db = low('./db.json');

// default
db.defaults({ posts: [] }).write();

const Blog = {};

/*
	@func getItems
	@desc gets all todos
*/
Blog.getItems = () => {
	return db.get('posts').value();	
}

/*
	@func createItem
	@desc creates a new todo
*/

Blog.createItem = (itemToCreate) => {
	db.get('posts').push({
		id: Date.now(), 
		data: itemToCreate,
	}).write();	
}

/*

*/	
Blog.updateItem = (id, key, propertyToUpdate) => {
	db.get('posts')
		  .find({ id })
		  .set(key, propertyToUpdate)
		  .write()	
}

Blog.deleteItem = (id) => {
	db.get('posts')
		.remove({id})
		.write();	
}

module.exports = Blog;