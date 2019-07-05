const Web3 = require('web3')
const privateKeyToAddress = require('ethereum-private-key-to-address')
const PrivateKeyProvider = require('truffle-privatekey-provider')
const chalk = require('chalk')

async function send(config) {
  const privateKey = (config.from||'').replace(/^0x/, '')
  const toAddress = config.to
  const amount = config.amount || 0
  const network =  config.network || 'mainnet'

  const providerUri = `https://${network}.infura.io/`
  const provider = new PrivateKeyProvider(privateKey, providerUri)
  const web3 = new Web3(provider)

  const weiValue = web3.utils.toWei(amount, 'ether')
  const fromAddress = privateKeyToAddress(privateKey)

  if (config.log) {
    console.log(chalk.yellow('sending transaction:'))
    console.log('\nnetwork: %s', network)
    console.log('from:    %s', fromAddress)
    console.log('to:      %s', toAddress)
    console.log('amount:  %s ETH (%s wei)', amount, weiValue)
  }

  const txHash = await new Promise((resolve, reject) => {
    web3.eth.sendTransaction({
      from: fromAddress,
      to: toAddress,
      value: weiValue,
      data: '0x00',
      gasLimit: 25000
    }, (err, txHash) => {
      if (err) return reject(err)
      resolve(txHash)
    })
  })

  if (config.log) {
    console.log('\ntx hash: %s', txHash)
  }

  return txHash
}

module.exports = send
