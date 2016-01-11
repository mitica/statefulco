'use strict';

if (!process.env.STATEFUL_USER) {
	console.warn('Set ENVS');
	return;
}

var counter = require('../lib/counter');
var assert = require('assert');

describe('counter', function() {

	it('#inc()', function() {
		assert.throws(function() {
			counter.inc();
		});
	});

	it('#inc(\'test-key\')', function(done) {
		counter.inc('test-key', done);
	});

	it('#inc(\'test-key\', 2)', function(done) {
		counter.inc('test-key', 2, done);
	});

	it('#inc(\'test-key\', 2, {timeout: 10})', function(done) {
		counter.inc('test-key', 2, {
			timeout: 10
		}, function(error) {
			assert.ok(error);
			done();
		});
	});

	it('#inc(\'test-key\', {user:\'me\'})', function() {
		counter.inc('test-key', {
			user: 'me'
		}, function(error) {
			assert.ok(error);
		});
	});
});
