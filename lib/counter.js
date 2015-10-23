'use strict';

var Promise = require('bluebird');
var request = require('request');

function req(url, method, config) {
	method = method || 'GET';
	config = config || {
		user: process.env.STATEFUL_USER,
		token: process.env.STATEFUL_TOKEN,
		timeout: process.env.STATEFUL_TIMEOUT || 5000
	};
	var options = {
		method: method,
		url: 'http://www.stateful.co' + url,
		headers: {
			'X-Sttc-URN': config.user,
			'X-Sttc-Token': config.token,
			'Accept': 'text/plain'
		},
		timeout: config.timeout || 5000
	};

	return new Promise(function(resolve, reject) {
		request(options,
			function(error, response, body) {
				if (error) {
					return reject(error);
				}
				resolve({
					body: body,
					response: response
				});
			});
	});
}

exports.inc = exports.increment = function(counter, value, config) {
	if (typeof value === 'object') {
		config = value;
		value = null;
	}
	value = value || 1;
	return req('/c/' + counter + '/inc?value=' + value, 'GET', config).then(function(result) {
		value = parseInt(result.body);
		if (isNaN(value)) {
			return Promise.reject(new Error('Count ' + counter + ' is not valid'));
		}
		return value;
	});
};

exports.set = function(counter, value, config) {
	return req('/c/' + counter + '/set?value=' + value, 'PUT', config).then(function(result) {
		return result.response.statusCode === 303;
	});
};
