'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded(({ extended: false })));
app.use(bodyParser.json());

app.get('/', (request, response) => {
	response.send('Hello from Express!');
});

let inventory = {};

app.post('/', (request, response) => {
	let item = request.body;
	if (inventory[item.label] !== undefined) {
		response.send('item already exists');
	} else {
		inventory[item.label] = item;
		response.send(inventory);
	}
});

app.listen(3000, () => {
	console.log('inventory app listening on port 3000 and using nodemon');
});