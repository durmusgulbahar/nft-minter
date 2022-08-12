require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const API_URL= process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  
  networks:{
    mumbai:{
      allowUnlimitedContractSize:true,
      url: API_URL,
      accounts:[`0x${PRIVATE_KEY}`]
    },
    bnb_test: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts:[`0x${PRIVATE_KEY}`]
    },
  }
};
