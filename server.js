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

app.post('/item', (request, response) => {
	let item = request.body;
	inventory.addItem(item);
	response.send(inventory.getAllItems());
});

app.delete('/item', (request, response) => {
	let key = request.body.label;
	inventory.deleteItem(key);
	response.send(inventory.getAllItems());
});

app.listen(3000, () => {
	console.log('inventory app listening on port 3000 and using nodemon');
});