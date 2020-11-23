const meow = require('meow')
const chalk = require('chalk')
const utils = require('web3-utils')
const send = require('.')

const cli = meow(`
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
`, {
  flags: {
    from: {
      type: 'string',
      alias: 'f'
    },
    to: {
      type: 'string',
      alias: 't'
    },
    amount: {
      type: 'string',
      alias: 'a'
    },
    value: {
      type: 'string',
      alias: 'v'
    },
    network: {
      type: 'string',
      alias: 'n'
    },
    gasPrice: {
      type: 'string',
      alias: 'p'
    },
    gas: {
      type: 'string',
      alias: 'g'
    },
    data: {
      type: 'string',
      alias: 'd'
    },
    silent: {
      type: 'boolean',
      alias: 's'
    },
  }
})

const from = cli.flags.f || cli.flags.from || process.env.FROM
const to = cli.flags.t || cli.flags.to
let value = cli.flags.v || cli.flags.value
let amount = cli.flags.a || cli.flags.amount
const data = cli.flags.d || cli.flags.data
const gas = cli.flags.g || cli.flags.gas
let gasPrice = cli.flags.p || cli.flags.gasPrice
const network = (cli.flags.n || cli.flags.network || '').toLowerCase()
const silent = cli.flags.s || cli.flags.silent

if (process.stdin) {
  process.stdin.setEncoding('utf8')
  process.stdin.resume()
  let content = ''
  process.stdin.on('data', (buf) => {
    content += buf.toString()
  })
  setTimeout(() => {
    content = content.trim()

    if (content) {
      amount = content
    }

    run()
  }, 10)
} else {
  run()
}

async function run() {
  if (from === undefined) {
    console.log('--from argument is required')
    process.exit(1)
  }

  if (to === undefined) {
    console.log('--to argument is required')
    process.exit(1)
  }

  if (amount === undefined && value === undefined) {
    console.log('--amount argument is required')
    process.exit(1)
  }

  if (gasPrice) {
    gasPrice = utils.toWei(gasPrice, 'gwei')
  }

  try {
    const txHash = await send({
      from,
      to,
      amount,
      value,
      network,
      data,
      gas,
      gasPrice,
      log: !silent
    })

    if (silent) {
      console.log(txHash)
    } else {
      if (['mainnet', 'ropsten', 'rinkeby', 'kovan', 'goerli'].includes(network)) {
        console.log('\n'+chalk.green(`https://${network !== 'mainnet' ? `${network}.` : '' }etherscan.io/tx/${txHash}`))
      }
    }

    process.exit(0)
  } catch(err) {
    console.error(chalk.red(err.message))
    process.exit(1)
  }
}
