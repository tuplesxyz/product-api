module.exports = function autoCatch (handlers) {
    return Object.keys(handlers).reduce((autoHandlers, key) => {
      const handler = handlers[key]
      autoHandlers[key] = (req, res, next) =>
        Promise.resolve(handler(req, res, next)).catch(next)
      return autoHandlers
    }, {})
  }
