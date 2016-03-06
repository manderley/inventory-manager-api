'use strict';

let inventory = {};

let addItem = function(item) {
	if (item.label in inventory) {
		throw new Error('Item already exists');
	} else {
		inventory[item.label] = item;
	}
};

let deleteItem = function(label) {
	if (label in inventory) {
		delete inventory[label];
	} else {
		throw new Error('Item cannot be deleted as it does not exist');
	}
};

let getAllItems = function() {
	let response = [];
	for (let key in inventory) {
		response.push(inventory[key]);
	}
	return response;
};

module.exports = {
	addItem,
	deleteItem,
	getAllItems
};