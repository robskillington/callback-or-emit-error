# callback-or-emit-error

Callback or emit an error when something is bad.

### When you want to support both events and callbacks

If you also keep writing code like this:

```js
  if (typeof callback === 'function') {
    return callback(err);
  } else {
    return this.emit('error', err);
  }
```

Then this module is for you!

Now just:

```js
  return callbackOrEmitError(this, callback, err);
```

## Installation

`npm install callback-or-emit-error`

## Tests

`npm test`

## MIT Licensed
