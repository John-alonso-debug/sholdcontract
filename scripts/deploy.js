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

  const trustlist = await deployContract(deployer, "TrustList",[0xeB21209ae4C2c9FF2a86ACA31E123764A3B6Bc06]);
  await trustlist.deployed();
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
