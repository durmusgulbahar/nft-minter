import { Contract, providers, utils } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { abi, NFT_CONTRACT_ADDRESS} from "../constants";
import styles from "../styles/Home.module.css";


export default function Home() {



  const [walletConnected, setWalletConnected] = useState(false);
  const [mintingHash, setMintingHash] = useState("");

  const web3ModalRef = useRef();

  const tokenUri = "https://gateway.pinata.cloud/ipfs/QmXrzMRBtHcDLGD9sKQ4HhrRHaXifgWULTBYt998WbXniT"

  const connectWallet = async () => {
    try{
      
      await getProviderOrSigner();
      setWalletConnected(true); 
    }
    catch(err){
      console.error(err);
    }
  }

  const mint = async () =>{
    console.log("minte tıklandı")
    try {
      const signer = await getProviderOrSigner(true);
      console.log("signer alındı")
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS,abi,signer);
      console.log("contract oluşturuldu")
      const minting = await nftContract.mintNFT(tokenUri,{value : utils.parseUnits("10000","gwei")});
      console.log("mintleme işlemi başlatıldı")
      await minting.wait();
      console.log(`NFT Minted! Check it out at: https://testnet.bscscan.com/tx/${minting.hash}`);
      setMintingHash(`https://testnet.bscscan.com/tx/${minting.hash}`);
      window.alert("You successfully minted NFT! Please look at 'Transcation Link'");
      
    } catch (error) {
      console.error(error);
    }

  }


  const getProviderOrSigner = async (needSigner = false) => {
    
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
   
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });
    }
  }, [walletConnected]);

  const nft = () => {
   if(walletConnected){
    return(
      <div className = {styles.nft}>
        <img className={styles.nft_img} src="https://s2.coinmarketcap.com/static/img/coins/200x200/20098.png"/>
        <p>Ziontopia NFT #1</p>
        <p>5 BNB</p>
        <button onClick={mint}> MINT </button>
      </div>
    )
   }
  }

  const walletsContainer = () => {
    if(!walletConnected){
    return(
      <div className={styles.walletsContainer}>
        <h1>Connect your wallet :</h1>
        <button className={styles.container} onClick={connectWallet}> 
             <img className = {styles.logo} src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"/>
             <p className = {styles.title}>Metamask</p>
             
        </button>
        
        </div>
    )
    }
    return(
      <div>
        {nft()}
      </div>
    )
  }

  return (
    <div className={styles.main}>
    {walletsContainer()}
    <a className={styles.link} target="_blank" href=""> GitHub Linki {">"}</a>
    <a className={styles.link} target="_blank" href={mintingHash}> Transaction Link {">"}</a>
    </div>
  )
}
