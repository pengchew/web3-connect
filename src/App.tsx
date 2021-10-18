import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import "@fontsource/inter";
import Web3 from 'web3';
import { useEffect, useState, useRef } from "react";
import Jazzicon from "@metamask/jazzicon";
import styled from "@emotion/styled";
import { BigNumber, utils } from 'ethers'


declare let window: any;

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const[provider,setprovider]=useState<{
    web3:any,
    address:string,
    shortAddress:string,
    networkId:number|string,
    weiBalance:number|string,
    etherBalance:number|string,
    symbol:string,
    jazzicon:any,
  }>({
    web3:'',
    address:'',
    shortAddress:'',
    networkId:'',
    weiBalance:'',
    etherBalance:'',
    symbol:'MATIC',
    jazzicon:<></>
  })

  function handlesetprovider(input=provider){
      setprovider(input);
  }

  const StyledIdenticon = styled.div`
    height: 1rem;
    width: 1rem;
    border-radius: 1.125rem;
    display:inline-block;
    margin-left:0.5rem;
  `;
  async function getProvider(flag={disconnect:false }) {

      const web3:any = new Web3(window.ethereum)
      await window.ethereum.enable();
      let _address = web3.utils.toChecksumAddress((await web3.eth.getAccounts())[0]);
      let _networkId = await web3.eth.net.getId();
      let _wei = '';
      let _eth = '';


      await web3.eth.getBalance(_address,(err:any,res:any)=>{
         _wei=res as string;
         _eth=web3.utils.fromWei(res,'ether');
      })

      const _provider=flag.disconnect?{
        web3:web3,
        address:'',
        shortAddress:'',
        networkId:'',
        weiBalance:'',
        etherBalance:'',
        symbol:provider.symbol,
        jazzicon:<></>
      }:{
        web3:web3,
        address:_address,
        shortAddress:_address.slice(0, 6)+'...'+_address.slice(_address.length - 4,_address.length),
        networkId:_networkId,
        weiBalance:_wei,
        etherBalance:_eth,
        symbol:provider.symbol,
        jazzicon:<StyledIdenticon ref={(nodeElement) => {
                                    if (nodeElement) {
                                      nodeElement.innerHTML = ''
                                      nodeElement.appendChild(Jazzicon(16, parseInt(_address.slice(2, 10), 16)))
                                    }
                                  }}
                                ></StyledIdenticon>
      }
      setprovider(_provider);
      console.log(_provider);
  }
  useEffect(()=>{
    window.ethereum.on("accountsChanged", async () => {
      getProvider()
    });
    window.ethereum.on("chainChanged", async () => {
      getProvider()
    });
  },[])
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <ConnectButton provider={provider} getProvider={getProvider} isOpen={isOpen} onClose={onClose} handleOpenModal={onOpen} />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
