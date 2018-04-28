const appEmulation = {
    stack: [],
    use: func => appEmulation.stack.push(func),
    get: (url, func) => appEmulation.stack.push((req, res, next) => {
      if (req.method === 'get' && req.url === url) {
        func(req, res, next);
      } else {
        next();
      }
    }),
    handle: (index, req, res, next) => {
      if (appEmulation.stack[index]) {
        appEmulation.stack[index](req, res, err =>
          (err ? next(err) : appEmulation.handle(index + 1, req, res, next)));
      } else {
        next();
      }
    },
  };

module.exports = appEmulation;