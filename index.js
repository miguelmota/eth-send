const Web3 = require('web3')
const privateKeyToAddress = require('ethereum-private-key-to-address')
const PrivateKeyProvider = require('truffle-privatekey-provider')
const chalk = require('chalk')

async function send (config) {
  const privateKey = (config.from || '').replace(/^0x/, '')
  const to = config.to
  let amount = config.amount || 0
  let value = config.value || 0
  const network = (config.network || 'mainnet').toLowerCase()

  let providerUri = `https://${network}.infura.io/`
  if (/^(http|ws)/.test(network)) {
    providerUri = network
  } else if (network === 'local' || network === 'development') {
    providerUri = 'http://localhost:8545'
  }

  const provider = new PrivateKeyProvider(privateKey, providerUri)
  const web3 = new Web3(provider)

  if (value && amount) {
    console.warn(chalk.yellow('warning: both "value" and "amount" set. Using "value" instead.'))
  }

  if (value) {
    amount = web3.utils.fromWei(value, 'ether')
  } else {
    value = web3.utils.toWei(amount, 'ether')
  }

  const from = privateKeyToAddress(privateKey)
  const data = config.data || '0x'
  const gas = config.gas || 21000
  const gasPrice = config.gasPrice || await web3.eth.getGasPrice()

  if (config.log) {
    console.log(chalk.yellow('sending transaction:'))
    console.log('\nnetwork:  %s', network)
    console.log('from:     %s', from)
    console.log('to:       %s', to)
    console.log('amount:   %s ETH (%s wei)', amount, value)
    console.log('gas:      %s', gas)
    console.log('gasPrice: %s gwei', web3.utils.fromWei(gasPrice, 'gwei'))
  }

  const txHash = await new Promise((resolve, reject) => {
    web3.eth.sendTransaction({
      from,
      to,
      value,
      data,
      gas,
      gasPrice
    }, (err, txHash) => {
      if (err) return reject(err)
      resolve(txHash)
    })
  })

  if (config.log) {
    console.log('\ntx hash:  %s', txHash)
  }

  return txHash
}

module.exports = send
