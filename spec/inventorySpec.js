'use strict'; 

const request = require('request');
const inventoryServer = require('../server.js');
const port = process.env.PORT || 3000;
const base_url = 'http://localhost:' + port + '/items';

let item = { 'label': 'item1', 'type': 'test', 'expires': '10/03/16 13:00:00' };

describe('Inventory manager tests', () => {
	describe('Get initial inventory', () => {
		it('returns status code 200', (done) => {
			request.get(base_url, (error, response, body) => {
				expect(response.statusCode).toBe(200);
				done();
			});
		});

		it('should return no items', (done) => {
			request.get(base_url, (error, response, body) => {
				expect(body).toBe('[]');
				done();
			});
		});
	});

	describe('Add item to inventory', () => {
		
		let itemString = JSON.stringify(item);
		
		it('returns correct status code and message', (done) => {
			request.post({
				headers: {'content-type': 'application/json'},
				url: base_url,
				body: itemString
			}, (error, response, body) => {
				expect(response.statusCode).toBe(201);
				expect(response.body).toBe('Item created');
				done();
			});
		});

		it('inventory should contain one item', (done) => {
			request.get(base_url, (error, response, body) => {
				let items = JSON.parse(body);
				expect(items.length).toBe(1);
				done();
			});
		});

		it('inventory should contain item added', (done) => {
			request.get(base_url, (error, response, body) => {
				let items = JSON.parse(body);
				expect(items[0].label).toBe(item.label);
				expect(items[0].type).toBe(item.type);
				expect(items[0].expires).toBe(item.expires);
				done();
			});
		});

		it('should not add item if item with same label already exists in inventory', (done) => {
			request.post({
				headers: {'content-type': 'application/json'},
				url: base_url,
				body: itemString
			}, (error, response, body) => {
				expect(response.statusCode).toBe(409);
				expect(response.body).toBe('Item already exists');
				done();
			});
		});
	});

	describe('Remove item from inventory', () => {
		
		it('returns correct status code when deleting existing item', (done) => {
			request.del(base_url+'/'+item.label, (error, response, body) => {
				expect(response.statusCode).toBe(204);
				done();
			});
		});

		it('causes inventory to be empty when item is deleted', (done) => {
			request.get(base_url, (error, response, body) => {
				expect(body).toBe('[]');
				done();
			});
		});

		it('returns correct status code when trying to delete item which does not exist', (done) => {
			request.del(base_url+'/item2', (error, response, body) => {
				expect(response.statusCode).toBe(404);
				done();
			});
		});

	});

	describe('Close server', () => {
		it('stops server', (done) => {
			inventoryServer.closeServer();
			done();
		});
	});

});
