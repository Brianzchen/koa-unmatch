const unmatch = require('./index');

describe('koa-unatch', () => {
  const unmatchPath = '/test';
  const anotherPath = '/not-test';
  const downstream = jest.fn();
  const nextMiddleware = jest.fn();
  const constructed = unmatch(unmatchPath, downstream);

  beforeEach(() => {
    downstream.mockClear();
    nextMiddleware.mockClear();
  })

  it('calls the next middleware if path does match', () => {
    constructed(
      {
        path: unmatchPath,
      },
      nextMiddleware,
    );

    expect(downstream).not.toHaveBeenCalled();
    expect(nextMiddleware).toHaveBeenCalled();
  });

  it('calls the downstream middleware if the path does not match', () => {
    constructed(
      {
        path: anotherPath,
      },
      nextMiddleware,
    );

    expect(downstream).toHaveBeenCalled();
    expect(nextMiddleware).not.toHaveBeenCalled();
  });

  it('calls the downstream middleware and next middleware if the downstream middleware calls next', () => {
    const callbackDownstream = jest.fn((ctx, callback) => callback());
    unmatch(unmatchPath, callbackDownstream)(
      {
        path: anotherPath,
      },
      nextMiddleware,
    );

    expect(callbackDownstream).toHaveBeenCalled();
    expect(nextMiddleware).toHaveBeenCalled();
  });
});
