'use strict';

var request = require('./request');

function foo() {}

exports.inc = exports.increment = function(counter, value, config, callback) {
	if (typeof counter !== 'string') {
		throw new Error('counter value is required');
	}
	if (typeof value === 'function') {
		callback = value;
		value = null;
	} else if (typeof value === 'object') {
		config = value;
		value = null;
	}
	if (typeof config === 'function') {
		callback = config;
		config = null;
	}
	if (~[null, undefined].indexOf(value)) {
		value = 1;
	}
	callback = callback || foo;

	var path = '/c/' + counter + '/inc?value=' + value;

	request(path, 'GET', config, function(error, result) {
		if (error) {
			return callback(error);
		}
		value = parseInt(result.body);
		if (isNaN(value)) {
			return callback(new Error('Count ' + counter + ' is not valid'));
		}
		callback(null, value);
	});
};

exports.set = function(counter, value, config, callback) {
	if (typeof counter !== 'string') {
		throw new Error('counter value is required');
	}
	if (typeof config === 'function') {
		callback = config;
		config = null;
	}
	callback = callback || foo;

	var path = '/c/' + counter + '/set?value=' + value;

	request(path, 'PUT', config, function(error, result) {
		if (error) {
			return callback(error);
		}
		callback(null, result.response.statusCode === 303);
	});
};
