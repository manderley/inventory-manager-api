'use strict';

let inventory = {};

let addItem = function(item) {
	inventory[item.label] = item;
	console.log(item);
	console.log(inventory);
};

let getAllItems = function() {
	return inventory;
};

module.exports = {
	addItem,
	getAllItems
};