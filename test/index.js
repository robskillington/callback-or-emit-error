var callbackOrEmitError = require('../index');
var EventEmitter = require('events').EventEmitter;
var sinon = require('sinon');
var test = require('cached-tape');

test('should verify object has an emit function', function t(assert) {
    assert.throws(function() {
        callbackOrEmitError({}, function(){}, new Error('An error'));
    }, /no emit function/);
    assert.end();
});

test('should call a valid callback and not emit an error', function t(assert) {
    var anError = new Error('An error');

    var callbackSpy = sinon.spy();
    var errorEventSpy = sinon.spy();
    
    var object = new EventEmitter();
    object.on('error', errorEventSpy);

    callbackOrEmitError(object, callbackSpy, anError);

    assert.ok(callbackSpy.calledOnce);
    assert.equal(callbackSpy.getCall(0).args[0], anError);

    assert.notOk(errorEventSpy.called);

    assert.end();
});

test('should emit an error with no valid callback', function t(assert) {
    var anError = new Error('An error');
    var errorEventSpy = sinon.spy();
    
    var object = new EventEmitter();
    object.on('error', errorEventSpy);

    callbackOrEmitError(object, undefined, anError);

    assert.ok(errorEventSpy.calledOnce);
    assert.equal(errorEventSpy.getCall(0).args[0], anError);

    assert.end();
});
