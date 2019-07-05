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

/*
  options:

    from: <private-key>
    to: <to-address>
    amount: <eth-amount>
    value: <wei-amount>
    network: <network-name>
    data: <tx-data>
    gas: <gas-limit>
    gasPrice: <gas-price-wei>
    log: <enable-logs>
*/
