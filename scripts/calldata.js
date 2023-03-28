// const helpers = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");
// require("@nomiclabs/hardhat-ethers")
const convexabi = require("./abiconvex.json")
const cvxcrvabi = require("./abicvxcrv.json")
const efcrvvaultabi = require("./abiefcrvvault.json")

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    const convexAddress = "0x3Fe65692bfCD0e6CF84cB1E7d24108E434A7587e"

    // Define the convex contract
    const convexContract = new ethers.Contract(convexAddress, convexabi, provider)
    // encode withdraw data [param get reward true]
    const withdrawAllData = convexContract.interface.encodeFunctionData("withdrawAll", [true])


    const cvxcrvAddress = "0x62b9c7356a2dc64a1969e19c23e4f579f9810aa7"
    const cvxcrvContract = new ethers.Contract(cvxcrvAddress, cvxcrvabi, provider)
    // todo toAddress, amount need fix
    // const transferData = cvxcrvContract.interface.encodeFunctionData("transfer", [toAddress, amount])

    console.log(`withdrawAllData is :${withdrawAllData}`)
    // console.log(`transferData is :${transferData}`)

    // ===================================== owner send transaction ( you can send data on etherscan) ==============


    // ===================================== withdraw from convex callwithdata =====================================
    const EFCRVVaultAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
    const efcrvContract = new ethers.Contract(EFCRVVaultAddress, efcrvvaultabi, provider)
    // check EFCRVVaultAddress cvxcrv balance
    const cvxcrvBalanceBefore = await cvxcrvContract.balanceOf(EFCRVVaultAddress)
    console.log(`before valut address cvxcrv balance is ${cvxcrvBalanceBefore}`)

    // callwithdata
    // param: toAddress
    // param: delegatecall data
    // param: amount
    // param: is delegatecall
    const callWithData = efcrvContract.interface.encodeFunctionData("callWithData",
        [
            convexAddress,
            withdrawAllData,
            0,
            true
        ]
    )
    // todo privateKey
    const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider)

    const tx = await wallet.sendTransaction({
        to: EFCRVVaultAddress,
        from: wallet.address,
        value: ethers.utils.parseUnits("0", "ether"),
        data: callWithData
    });

    console.log("Mining transaction...");

    // Waiting for the transaction to be mined
    const receipt = await tx.wait();

    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);
    // check EFCRVVaultAddress cvxcrv balance again
    const cvxcrvBalance = await cvxcrvContract.balanceOf(EFCRVVaultAddress)
    console.log(`now valut address cvxcrv balance is ${cvxcrvBalance}`)


    // ===================================== transfer cvxcrv callwithdata =====================================
    // const EFCRVVaultAddress = "0x16b0C918B4aEE4Fa87AE20576A369723A3A7F648"
    // const efcrvContract = new ethers.Contract(EFCRVVaultAddress, efcrvvaultabi, provider)

    // check EFCRVVaultAddress cvxcrv balance
    // const cvxcrvBalanceBefore = await cvxcrvContract.balanceOf(EFCRVVaultAddress)
    // console.log(`before valut address cvxcrv balance is ${cvxcrvBalanceBefore}`)

    // // callwithdata
    // // param: toAddress
    // // param: delegatecall data
    // // param: amount
    // // param: is delegatecall
    // const callWithData = efcrvContract.interface.encodeFunctionData("callWithData",
    //     [
    //         cvxcrvAddress,
    //         transferData,
    //         0,
    //         true
    //     ]
    // )
    // // todo privateKey
    // const wallet = new ethers.Wallet("privateKey", provider)

    // const tx = await wallet.sendTransaction({
    //     to: EFCRVVaultAddress,
    //     from: wallet.address,
    //     value: ethers.utils.parseUnits("0", "ether"),
    //     data: callWithData
    // });

    // console.log("Mining transaction...");

    // // Waiting for the transaction to be mined
    // const receipt = await tx.wait();

    // // The transaction is now on chain!
    // console.log(`Mined in block ${receipt.blockNumber}`);
    // check EFCRVVaultAddress cvxcrv balance again
    // const cvxcrvBalance = await cvxcrvContract.balanceOf(EFCRVVaultAddress)
    // console.log(`now valut address cvxcrv balance is ${cvxcrvBalance}`)

}

main();