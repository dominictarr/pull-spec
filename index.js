

var Source = module.exports = function (source, name) {
  var calling = false
  return function (abort, cb) {
    if(abort) {
      return source(abort, function (err, data) {
        cb(err, data)
      })
    }
    if(calling) {
      console.log(calling.stack)
      throw new Error(name+': already calling')
    }
    calling = new Error('calling')
    var called = false
    source(abort, function (end, data) {
      if(called) throw new Error(name+': already called')
      if(end && data)
        throw new Error(name+': data should be null if end')
      calling = false
      cb(end, data)
    })
  }
}

module.exports.sink = function (sink) {
  var called = false
  return function (source) {
    if(called) throw new Error('piped sink too more than once')
    called = true
    return sink(Source(source))
  }
}




