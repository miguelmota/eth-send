# eth-send

> Simple way to send ether.

[![License](http://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/miguelmota/eth-send/master/LICENSE)
[![NPM version](https://badge.fury.io/js/eth-send.svg)](http://badge.fury.io/js/eth-send)

## Install

```bash
npm install eth-send
```

## Getting started

```javascript
const send = require('eth-send')

;(async () => {
  const txHash = await send({
    from: '4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d',
    to: '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',
    amount: '0.01',
    network: 'rinkeby'
  })

  console.log(txHash) // 0x8ee7ed489c7cb206cd9b4ff65a5d2977324b4f727b12cd2e0c0bbcaa59219e00
})()

```

[example](https://github.com/miguelmota/eth-send/blob/master/example/example.js)

## CLI

Install:

```bash
npm install -g eth-send
```

Example of sending ether on testnet from an account loaded via the private key, to another address:

```bash
$ eth-send \
  --from 4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d \
  --to 0xffcf8fdee72ac11b5c542428b35eef5769c409f0 \
  --amount 0.01 \
  --network rinkeby

sending transaction:

network:  rinkeby
from:     0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1
to:       0xffcf8fdee72ac11b5c542428b35eef5769c409f0
amount:   0.01 ETH (10000000000000000 wei)
gas:      21000
gasPrice: 1 gwei

tx hash:  0x8ee7ed489c7cb206cd9b4ff65a5d2977324b4f727b12cd2e0c0bbcaa59219e00

https://rinkeby.etherscan.io/tx/0x8ee7ed489c7cb206cd9b4ff65a5d2977324b4f727b12cd2e0c0bbcaa59219e00
```

Use the silent flag to only return the transaction hash:

```bash
$ eth-send [...] --silent

0x8ee7ed489c7cb206cd9b4ff65a5d2977324b4f727b12cd2e0c0bbcaa59219e00
```

You may use a custom provider in the network flag:

```
$ eth-send [...] --network https://rinkeby.infura.io/
```

The sender private key can be set as an environment variable:

```bash
FROM=4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d eth-send [....]
```

Piping ETH amount to send:

```bash
$ echo 0.1 | eth-send [...]

0x8ee7ed489c7cb206cd9b4ff65a5d2977324b4f727b12cd2e0c0bbcaa59219e00
```

Show help:

```bash
$ eth-send --help

  Simple way to send ether.

  Usage
  $ eth-send --from <private-key> --to <address> --amount <ether> --network <network> [--silent]

  Options
    --from, -f Private key of sender (required)
    --to, -t Address to send to (required)
    --amount, -a Ether amount to send (required)
    --value , -v Wei amount to send (alternative to --amount)
    --network, -n Network name or network provider URI (default "mainnet")
    --gasPrice, -p Gas price in gwei
    --gas, -g Gas limit
    --data, -d Transaction data
    --silent, -s Silent output

  Examples
  $ eth-send --from 4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d --to 0xffcf8fdee72ac11b5c542428b35eef5769c409f0 --amount 0.01 --network rinkeby --silent

  0x8ee7ed489c7cb206cd9b4ff65a5d2977324b4f727b12cd2e0c0bbcaa59219e00
```

## Test

```bash
npm test
```

## License

[MIT](LICENSE)
