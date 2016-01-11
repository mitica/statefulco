'use strict';

var http = require('http');

var CONFIG = {
	user: process.env.STATEFUL_USER,
	token: process.env.STATEFUL_TOKEN,
	timeout: process.env.STATEFUL_TIMEOUT || 5000,
	host: process.env.STATEFUL_HOST || 'www.stateful.co'
};

function foo() {}

module.exports = function request(path, method, config, callback) {
	if (typeof config === 'function') {
		callback = config;
		config = null;
	}
	method = method || 'GET';
	config = config || CONFIG;

	for (var prop in CONFIG) {
		if (config[prop] === undefined) {
			config[prop] = CONFIG[prop];
		}
	}

	callback = callback || foo;

	var options = {
		method: method,
		host: config.host,
		path: path,
		headers: {
			'X-Sttc-URN': config.user,
			'X-Sttc-Token': config.token,
			'Accept': 'text/plain'
		},
		timeout: config.timeout
	};

	var req = http.request(options, function(res) {
		var data = '';
		res.on('data', function(chunk) {
			data += chunk;
		});
		res.on('end', function() {
			callback(null, {
				body: data,
				response: res
			});
		});
	});

	req.on('error', callback);
	req.on('timeout', req.abort);
	req.end();

	req.setTimeout(options.timeout);

	return req;
};
