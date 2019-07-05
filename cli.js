const meow = require('meow')
const chalk = require('chalk')
const send = require('.')

const cli = meow(`
    Usage
    $ eth_send --from <private-key> --to <address> --amount <ether> --network <network> [--silent]

    Options
      --from, -f Private key of sender (required)
      --to, -t Address to send to (required)
      --amount, -a Ether amount to send (required)
      --network, -n Network name (default "mainnet")
      --gasPrice, -p Gas price in wei
      --gas, -g Gas limit
      --data, -d Tx data
      --silent, -s Silent output

    Examples
    $ eth_send --from 4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d --to 0xffcf8fdee72ac11b5c542428b35eef5769c409f0
      --amount 0.01 --network rinkeby --silent

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

const from = cli.flags.f || cli.flags.from
const to = cli.flags.t || cli.flags.to
const amount = cli.flags.a || cli.flags.amount
const data = cli.flags.d || cli.flags.data
const gas = cli.flags.g || cli.flags.gas
const gasPrice = cli.flags.p || cli.flags.gasPrice
const network = cli.flags.n || cli.flags.network
const silent = cli.flags.s || cli.flags.silent

if (!from) {
  console.log('--from argument is required')
  process.exit(1)
}

if (!to) {
  console.log('--to argument is required')
  process.exit(1)
}

async function main() {
  try {
    const txHash = await send({
      from,
      to,
      amount,
      network,
      data,
      gas,
      gasPrice,
      log: !silent
    })

    if (silent) {
      console.log(txHash)
    } else {
      console.log('\n'+chalk.green(`https://${network !== 'mainnet' ? `${network}.` : '' }etherscan.io/tx/${txHash}`))
    }

    process.exit(0)
  } catch(err) {
    console.error(chalk.red(err.message))
  }
}

main()
