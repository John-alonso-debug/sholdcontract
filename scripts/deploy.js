// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { deployContract, deployUpgradeable, verifyContract, verifyUpgradeable } = require("./utils");

const constants = require("./constant");


async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
      `vault deployed to ${deployer.address}`
  );
  /////////////////////////////////////////
  //             DEPLOYING               //
  /////////////////////////////////////////

  console.log("\nDeploying Contracts\n");
  const Lib = await ethers.getContractFactory("AddressArray");
  const lib = await Lib.deploy();
  await lib.deployed();

  const Contract = await ethers.getContractFactory("TrustList", {
    signer: deployer,
    libraries:{
      AddressArray: lib.address
    }
  });
  const contractTrustList = await Contract.deploy(["0x114A33FBAd98D27E91882aC8b1e0D1513A350216"]);


  await contractTrustList.deployed();

  console.log(
      `AddressArray lib deployed to ${lib.address}`
  );
  console.log(`contractTrustList deployed at: ${contractTrustList.address}\n`);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
