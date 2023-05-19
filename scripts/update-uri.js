require('dotenv').config();
const ethers = require('ethers');

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
const newUri = "https://gateway.pinata.cloud/ipfs/QmSArjrFwAjfnakdRhHwC2TPQVMpneSMi1BraeMxeJ5TTe"

const updateUri = async () => {
    let txn = await myNftContract.updateTokenURI(3, newUri);
    await txn.wait();
    console.log(`NFTs updated successfully! Check it out at: https://mumbai.polygonscan.com/tx/${txn.hash}`);

}

updateUri()
    .then(() => process.exit(0))
    .catch((error) => { 
        console.error(error);
        process.exit(1);
    });