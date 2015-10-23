'use strict';

var counter = require('../lib/counter');
// var assert = require('assert');

describe('counter', function() {

	it('#inc()', function(done) {
		return counter.inc().catch(function() {
			done();
		});
	});

	it('#inc(\'some-key\')', function(done) {
		return counter.inc('some-key').catch(function() {
			done();
		});
	});

	it('#inc(\'some-key\', 2)', function(done) {
		return counter.inc('some-key', 2).catch(function() {
			done();
		});
	});

	it('#inc(\'some-key\', {use :\'me\'})', function(done) {
		return counter.inc('some-key', {
			user: 'me'
		}).catch(function() {
			done();
		});
	});
});
