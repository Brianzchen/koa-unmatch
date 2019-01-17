// accepts list of paths or string matching path to NOT run middleware against
module.exports = (path, downstream) => async (ctx, next) => {
  // if path is string, check if is string
  // otherwise assume array and loop to make same check
  // if path is same, skip the passed in middleware
  if (typeof path === 'string' && ctx.path === path) {
    return next();
  }
  if (path.constructor === Array) {
    for (let i = 0, len = path.length; i < len; i++) {
      const p = path[i];

      if (p === ctx.path) return next();
    }
  }

  // run the passed in middleware
  return downstream(ctx, async () => {
    await next();
  });
};
