
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

    await impersonateFundErc20(BUSD, BSC_WHALE, Flashloan.address, "1000.0");

    await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: ["0x5414d89a8bF7E99d732BC52f3e6A3Ef461c0C078"], //usdc whale
    });
    const FUND_AMOUNT = ethers.utils.parseUnits(1000, 18);

    // fund erc20 token to the contract
    const MrWhale = await ethers.getSigner("0x5414d89a8bF7E99d732BC52f3e6A3Ef461c0C078");

    const contractSigner = contract.connect(MrWhale);
    await contractSigner.transfer(recepient, FUND_AMOUNT);


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
