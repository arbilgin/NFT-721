require('dotenv').config();
const ethers = require('ethers');

const airdropAddresses = [
    '0x808b891a69f2cF52f84228DA61f2F4F5b08297DE',
    '0x24D4DE486cC3773Eb8FE5Fb7f6Db19153EF91092',
    '0x142e6EE40bd42643aA4D3F7A0ae066997F902788',
];

// Get Alchemy API Key
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('maticmum', API_KEY);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0xd1Be9A433351bf4ce6d20C9e05Eb30D016f5d568'

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmcAMZhu621FwRzUuS2h5pMnNsS1SoyVfr91smb9LpYFNR"

const airdrop = async () => {
    let txn = await myNftContract.airdropNfts(airdropAddresses, tokenUri);
    await txn.wait();
    console.log(`NFTs airdropped successfully! Check it out at: https://mumbai.polygonscan.com/tx/${txn.hash}`);

    console.log("\nCurrent NFT balances:")
    for (let i = 0; i < airdropAddresses.length; i++) {
        let bal = await myNftContract.balanceOf(airdropAddresses[i]);
        console.log(`${i + 1}. ${airdropAddresses[i]}: ${bal}`);
    }

    // Call mintNFT function
    // const mintNFT = async () => {
    //     let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    //     await nftTxn.wait()
    //     console.log(`NFT Minted! Check it out at: https://mumbai.polygonscan.com/tx/${nftTxn.hash}`)
    }

    airdrop()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });