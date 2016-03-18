'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const inventory = require('./inventory.js');
const app = express();
const approvedDomain = 'http://localhost:8080';

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded(({ extended: false })));
app.use(bodyParser.json());

app.all('/*', (request, response, next) => {
	response.header('Access-Control-Allow-Origin', approvedDomain);
	response.header('Access-Control-Allow-Headers', 'X-Requested-With');
	response.header('Access-Control-Allow-Methods', 'GET, DELETE');
	next();
}); 

app.get('/items', (request, response) => {
	let jsonpCallback = app.get('jsonp callback name');
	let jsonp = (request.query[jsonpCallback]);
	if (jsonp) {
		response.send(request.query.callback + '(' + JSON.stringify(inventory.getAllItems()) + ');');
	} else {
		response.send(inventory.getAllItems());
	}
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

var server = app.listen(app.get('port'), () => {
	console.log('inventory app listening on port ' + app.get('port') + ' and using nodemon');
});

exports.closeServer = function() {
	server.close();
};