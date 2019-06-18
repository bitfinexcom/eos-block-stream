# eos-block-stream

Small module to read the EOS blocks file out in individual block chunks

```
npm install eos-block-stream
```

## Usage

``` js
const eos = require('eos-block-stream')

const stream = eos('/path/to/eos/folder') // the folder that has a ./blocks child folder

stream.on('data', function () {
  // first data chunks the the genesis block + the version data etc
  // see https://github.com/EOSIO/eos/blob/master/libraries/chain/block_log.cpp for more
  // the following ones are the individual block chain blocks.
})
```

## License

MIT
