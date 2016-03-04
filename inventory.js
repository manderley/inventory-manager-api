'use strict';

let inventory = {};

let addItem = function(item) {
	inventory[item.label] = item;
};

let deleteItem = function(key) {
	delete inventory[key];
};

let getAllItems = function() {
	return inventory;
};

module.exports = {
	addItem,
	deleteItem,
	getAllItems
};