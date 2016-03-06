'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const inventory = require('./inventory.js');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded(({ extended: false })));
app.use(bodyParser.json());

app.get('/', (request, response) => {
	response.render('index', {
		pageTitle: 'Inventory'
	});
});

app.get('/items', (request, response) => {
	response.send(inventory.getAllItems());
});

app.post('/items', (request, response) => {
	let item = request.body;
	try {
		inventory.addItem(item);
		response.status(201).send('Item created');
	}
	catch (error) {
		response.status(409).send(error.message);
	}
});

app.delete('/items/:label', (request, response) => {
	let label = request.params.label;
	try {
		inventory.deleteItem(label);
		response.status(204).send();
	} 
	catch (error) {
		response.status(404).send(error.message);
	}
});

var server = app.listen(3000, () => {
	console.log('inventory app listening on port 3000 and using nodemon');
});

exports.closeServer = function() {
	server.close();
}