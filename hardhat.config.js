require("@nomiclabs/hardhat-truffle5");

module.exports = {
  solidity: {
    version: "0.5.5",
    settings: {
      optimizer: {
        enabled: false,
        runs: 200
      }
    }
  },
};
