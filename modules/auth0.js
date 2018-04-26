/**
 *
 * @return {Function}
 * @api public
 */
module.exports = function handleCallbackError() {
  return function(req, res, next) {
    if ((req.query) && (req.query.error)){
      return next(new Error(req.query.error +': '+req.query.error_description));
    }
    next();
  }
};
