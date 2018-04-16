/**
 *
 * @return {Function}
 * @api public
 */
module.exports = function handleCallbackError() {
  return function(req, res, next) {
    console.log(req);
    console.log("in between")
    console.log('req.query.err',req.query.error);
    if (req.query.error){
      return next(new Error(req.query.error +': '+req.query.error_description));
    }
    next();
};
};
