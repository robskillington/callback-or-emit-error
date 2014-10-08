
module.exports = callbackOrEmitError;

function callbackOrEmitError(object, callback, err) {
    if (typeof object.emit !== 'function') {
        throw new Error('Object has no emit function');
    }

    if (typeof callback === 'function') {
        return callback(err);
    }

    object.emit('error', err);
}
