'use strict';

const express = require('express');
const app = express();

app.get('/', (request, response) => {
	response.send('Hello from Express!');
});

app.listen(3000, () => {
	console.log('inventory app listening on port 3000');
});