const request = require('request');
const inventoryServer = require('../server.js');
const base_url = 'http://localhost:3000/items';

describe('Get initial inventory', () => {
	it('returns status code 200', (done) => {
		request.get(base_url, (error, response, body) => {
			expect(response.statusCode).toBe(200);
			done();
		});
	});

	it('should return no items', (done) => {
		request.get(base_url, (error, response, body) => {
			expect(body).toBe('{}');
			done();
		});
	});

	it('stop server', (done) => {
		inventoryServer.closeServer();
		done();
	});
});
