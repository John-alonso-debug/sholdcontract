require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.7"
      },
      {
        version: "0.8.0"
      },
      {
        version: "0.6.12"
      }
    ]
  },

  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    deploy: "./scripts/deploy",
    deployments: "./deployments",
  },

  providerOptions: {
    allowUnlimitedContractSize: true,
  },

  networks: {
    hardhat: {
      gasPrice: "auto",
      gasMultiplier: 2,
      allowUnlimitedContractSize: true,
    },
    localnet: {
      // Ganache etc.
      url: "http://127.0.0.1:8545",
      gasPrice: "auto",
      gasMultiplier: 2,
      // blockGasLimit: 800000,
      allowUnlimitedContractSize: true,
    },

    mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 470000000000,
      chainId: 43114,
      accounts: [
      ]
    }
  }
};
