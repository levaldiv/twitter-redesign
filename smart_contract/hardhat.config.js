require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.2',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/Ms-aA3QkLsmN27PeC5JP317SynKWwlHV',
      accounts: [
        'a73d70dbb14bbafd93bc4f46ed290ee9357c3be89a63e5e6e3c131f890c15770',
      ],
    },
  },
}