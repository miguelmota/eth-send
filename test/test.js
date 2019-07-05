const test = require('tape-await')
const send = require('../')

test('send', async t => {
  const txHash = await send({
    from: '4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d',
    to: '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0',
    amount: '0.01',
    network: 'rinkeby'
  })

  t.equal(txHash.startsWith('0x'), true)
  t.equal(txHash.length, 66)
})
