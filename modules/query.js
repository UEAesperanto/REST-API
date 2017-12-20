function _search(query) {
  return function(element) {
    for(var i in query) {
      if(i == 'naskigxtago') {
        if(query[i] >= element[i]) {
          return false;
        }
      } else {
        if(element[i] instanceof Buffer) {
          var el = parseInt(element[i].toString('hex'));
          if(query[i] != el) {
            return false;
          }
        } else {
          if(query[i] != element[i]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

module.exports = {
  search:_search
}
