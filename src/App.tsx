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
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <ConnectButton isOpen={isOpen} onClose={onClose} handleOpenModal={onOpen} />
      </Layout>
    </ChakraProvider>
  );
}

export default App;

const StyledIdenticon = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  background-color: black;
`;
export async function getProvider() {
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
      'jazzicon':<div ref={(nodeElement) => {
                      if (nodeElement) {
                        nodeElement.innerHTML = ''
                        nodeElement.appendChild(Jazzicon(16, parseInt(_address.slice(2, 10), 16)))
                      }
                    }}
                  ></div>
    }
}
