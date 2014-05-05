var through = require('through2')

module.exports = function (key, windowLength) {

    return through(movingAvg(key, windowLength))
}


function movingAvg (key, windowLength) {

  if (!windowLength) windowLength = 5

  var winarr = []

  function transformer(chunk, enc, callback) {
    var data = JSON.parse(chunk)

      winarr.push(data[key])

    if (winarr.length > windowLength) {
      winarr.shift()
    }

      data[key] = takemean(winarr)

    this.push(JSON.stringify(data)+'\n')

    callback()
  }


  function takemean (arr) {
    return arr.reduce( function(p,c) {
             return p+c;
           } ) / arr.length
  }

  return transformer
}
