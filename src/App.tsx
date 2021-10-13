import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import "@fontsource/inter";
import Web3 from 'web3';
import { useEffect, useState } from "react";

declare let window: any;


function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </Layout>
    </ChakraProvider>
  );
}

export default App;

export async function getConnector() {
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
    return{
      'address':_address,
      'networkId':_networkId,
      'weiBalance':_wei,
      'etherBalance':_eth,
    }
}
