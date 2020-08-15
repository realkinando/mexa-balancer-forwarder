usePlugin("@nomiclabs/buidler-waffle");
const {ethers} = require("ethers");

// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

const seedToKeyBalances = (seedPhrase,initBalance,count) => {
  let keyBalances = [];
  for(i = 0; i < count; i++){
    keyBalances.push({privateKey:ethers.Wallet.fromMnemonic(seedPhrase,"m/44'/60'/0'/0/"+i).privateKey,balance:initBalance})
  }
  return keyBalances
}

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
module.exports = {
  solc: {
    version: "0.6.8"
  },
  paths: {
    sources: "./contracts/6"
  },
}
