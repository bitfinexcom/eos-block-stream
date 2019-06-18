const from2 = require('from2')
const raf = require('random-access-file')
const uint64le = require('uint64le')

module.exports = function (directory) {
  const idx = raf('blocks/blocks.index', { directory })
  const blks = raf('blocks/blocks.log', { directory })

  let ptr = 0
  let needsHeader = true

  return from2.obj(function (size, cb) {
    if (needsHeader) return readHeader(cb)
    idx.read(ptr, 8, function (err, start) {
      if (err) return cb(err)
      idx.read(ptr + 8, 8, function onend (err, end) {
        if (err) return readSize(onend)
        const s = uint64le.decode(start)
        const e = uint64le.decode(end)
        ptr += 8
        blks.read(s, e - s, cb)
      })
    })
  })

  function readHeader (cb) {
    idx.read(0, 8, function (err, start) {
      if (err) return cb(err)
      needsHeader = false
      const s = uint64le.decode(start)
      blks.read(0, s, cb)
    })
  }

  function readSize (cb) {
    blks.stat(function (err, st) {
      if (err) return cb(err)
      cb(null, uint64le.encode(st.size))
    })
  }
}
