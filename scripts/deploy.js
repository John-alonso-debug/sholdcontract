// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const { deployContract, deployUpgradeable, verifyContract, verifyUpgradeable } = require("./utils");


async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
      `deployer  ${deployer.address}`
  );
/////////////////////////////////////////
  //             DEPLOYING               //
  /////////////////////////////////////////

  const Lib = await ethers.getContractFactory("SafeMathR");
  const lib = await Lib.deploy();
  await lib.deployed();


  console.log("\nDeploying Contracts\n");

  const token = await deployContract(deployer, "ERC20Token", []);
  await token.deployed();
  //const vault = await deployContract(deployer, "EFCRVVault",constants.curveAave);
  //await vault.deployed();

  console.log(
    `ERC20Token deployed to ${token.address}`
  );

  const Contract = await ethers.getContractFactory("EFCRVVault", {
    signer: deployer,
    libraries:{
      SafeMathR: lib.address
    }
  });
  const vault = await Contract.deploy(token.address);
  await vault.deployed();

  //const vault = await deployContract(deployer, "EFCRVVault",constants.curveAave);
  //await vault.deployed();

  console.log(
    `vault deployed to ${vault.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
