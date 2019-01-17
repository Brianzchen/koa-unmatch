# koa-unmatch

Run other koa middleware given that the path DOES NOT match

Passing in either a single or array of strings, plus a middleware, this middleware will run the given middleware when the requested path does not match any of the given paths

## Installation

This module is distributed via npm:

```
npm install --save koa-unmatch
```
or
```
yarn add koa-unmatch
```

## Usage

```js
const Koa = require('koa');
const unmatch = require('koa-unmatch');

const app = new Koa();
app.use(unmatch('/path', (ctx, next) => {
  // do something here
}))
```
