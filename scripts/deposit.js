// const helpers = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");
// require("@nomiclabs/hardhat-ethers")
const convexabi = require("./abiconvex.json")
const cvxcrvabi = require("./abicvxcrv.json")
const efcrvvaultabi = require("./abiefcrvvault.json")
const uniabi = require("./abiuni.json")

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    // todo privateKey , this key is hardhat 0
    const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider)
    const uniswapAddress = "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45"
    const usdcAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
    const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

    const usdcContract = new ethers.Contract(usdcAddress, cvxcrvabi, provider)

    // ===================================== swap eth to usdc =====================================
    
    const uniswapContract = new ethers.Contract(uniswapAddress, uniabi, provider)
    const swapData = uniswapContract.interface.encodeFunctionData(
        "exactInputSingle", 
        [
            [
                wethAddress, //token in
                usdcAddress, //token out
                3000, // fee
                wallet.address, // recipient
                ethers.utils.parseUnits("10", "ether"), // amount in
                0, //amountOutMinimum
                0 //sqrtPriceLimitX96
            ] 
        ]
    )
    const txSwap = await wallet.sendTransaction({
        to: uniswapAddress,
        from: wallet.address,
        value: ethers.utils.parseUnits("10", "ether"),
        data: swapData
    });
    console.log("swaping ...");
    // Waiting for the transaction to be mined
    const receiptSwap = await txSwap.wait();
    // The transaction is now on chain!
    console.log(`Mined in block ${receiptSwap.blockNumber}`);
    const usdcBalance = await usdcContract.balanceOf(wallet.address)
    console.log(`now my address usdc balance is ${usdcBalance}`)

    // ===================================== deposit =====================================
    // todo new depoly address
    // const EFCRVVaultAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
    // const efcrvContract = new ethers.Contract(EFCRVVaultAddress, efcrvvaultabi, provider)
    
        
    // const approveData = usdcContract.interface.encodeFunctionData("approve", [EFCRVVaultAddress, ethers.constants.MaxUint256])
    
    // const txApprove = await wallet.sendTransaction({
    //     to: usdcAddress,
    //     from: wallet.address,
    //     value: ethers.utils.parseUnits("0", "ether"),
    //     data: approveData
    // });

    // console.log("Approving usdc to vault ...");
    // // Waiting for the transaction to be mined
    // const receiptApprove = await txApprove.wait();
    // // The transaction is now on chain!
    // console.log(`Mined in block ${receiptApprove.blockNumber}`);

    // // depositData
    // // todo amount
    // const depositData = efcrvContract.interface.encodeFunctionData("depositStable",
    //     [
    //         ethers.utils.parseUnits("10000", 6)
    //     ]
    // )
    
    // const tx = await wallet.sendTransaction({
    //     to: EFCRVVaultAddress,
    //     from: wallet.address,
    //     value: ethers.utils.parseUnits("0", "ether"),
    //     data: depositData
    // });

    // console.log("Depositing ...");

    // // Waiting for the transaction to be mined
    // const receipt = await tx.wait();

    // // The transaction is now on chain!
    // console.log(`Mined in block ${receipt.blockNumber}`);
}

main();