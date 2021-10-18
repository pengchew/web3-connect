import Web3 from 'web3';
import { useEffect, useState,useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon, CopyIcon } from "@chakra-ui/icons";


declare let window: any;

export async function changeNetwork(network=''){
  enum ChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GOERLI = 5,
    KOVAN = 42,

    ARBITRUM_ONE = 42161,
    ARBITRUM_RINKEBY = 421611,
    OPTIMISM = 10,
    OPTIMISTIC_KOVAN = 69,
  }
  const CHAIN_INFO: { [key: string]: any } = {
    'BNB':{
      chainId: '0x38',
      chainName: 'Binance Smart Chain',
      nativeCurrency: {
          name: 'Binance Coin',
          symbol: 'BNB',
          decimals: 18
      },
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      blockExplorerUrls: ['https://bscscan.com/']
    },
    'FTM':{
      chainId: '0xfa',
      chainName: 'Fantom Opera',
      nativeCurrency: {
          name: 'FTM',
          symbol: 'FTM',
          decimals: 18
      },
      rpcUrls: ['https://rpc.ftm.tools/'],
      blockExplorerUrls: ['https://ftmscan.com/']
    },
    'MATIC':{
      chainId: '0x89',
      chainName: 'Matic Mainnet',
      nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
      },
      rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
      blockExplorerUrls: ['https://explorer.matic.network/']
    },
    'AVAX':{
      chainId: '0xa86a',
      chainName: 'Avalanche Network',
      nativeCurrency: {
          name: 'AVAX',
          symbol: 'AVAX',
          decimals: 18
      },
      rpcUrls: ['https://api.avax.network/ext/bc/C/rpc/'],
      blockExplorerUrls: ['https://cchain.explorer.avax.network/']
    },

  }

  const tx = await window.ethereum.request({method: 'wallet_addEthereumChain', params:[CHAIN_INFO[network]]}).catch()
  if (tx) {
      console.log(tx)
  }
}
type Props = {
  handleOpenModal: any;
  isOpen: any;
  onClose: any;
  provider: any;
  getProvider: any;
};

export default function ConnectButton({ handleOpenModal,isOpen, onClose,provider,getProvider }: Props) {
  const web3:any = new Web3(window.ethereum)
  // const provider = connect();
  const initialRef = useRef<any>();

  if(!provider.address){
    return (
      <><Button
        onClick={()=>getProvider({})}
        bg="blue.800"
        color="blue.300"
        fontSize="lg"
        fontWeight="medium"
        borderRadius="xl"
        border="1px solid transparent"
        _hover={{
          borderColor: "blue.700",
          color: "blue.400",
        }}
        _active={{
          backgroundColor: "blue.800",
          borderColor: "blue.700",
        }}
      >
        Connect to a wallet
      </Button></>
    );
  }

  if(provider.networkId!==137){
    return(
      <><Button
        onClick={()=>changeNetwork(provider.symbol)}
        bg="blue.800"
        color="blue.300"
        fontSize="lg"
        fontWeight="medium"
        borderRadius="xl"
        border="1px solid transparent"
        _hover={{
          borderColor: "blue.700",
          color: "blue.400",
        }}
        _active={{
          backgroundColor: "blue.800",
          borderColor: "blue.700",
        }}
      >
        Switch to {provider.symbol}
      </Button></>
    )
  }
  else{
    return(
      <><Modal autoFocus={false}  isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent
          background="gray.900"
          border="1px"
          borderStyle="solid"
          borderColor="gray.700"
          borderRadius="3xl"
        >
          <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
            Account

          </ModalHeader>
          <ModalCloseButton
            color="white"
            fontSize="sm"
          />
          <ModalBody pt={0} px={4}>
            <Box
              borderRadius="3xl"
              border="1px"
              borderStyle="solid"
              borderColor="gray.600"
              px={5}
              pt={4}
              pb={2}
              mb={3}
            >
              <Flex justifyContent="space-between" alignItems="center" mb={3}>
                <Text color="gray.400" fontSize="sm">
                  Connected with MetaMask
                </Text>
                <Button
                  ref={initialRef}
                  onClick={()=>getProvider({disconnect:true})}
                  variant="outline"
                  size="sm"
                  borderColor="blue.800"
                  borderRadius="3xl"
                  color="blue.500"
                  fontSize="13px"
                  fontWeight="normal"
                  px={2}
                  height="26px"
                  _hover={{
                    background: "none",
                    borderColor: "blue.300",
                    textDecoration: "none",
                  }}
                >
                  Change
                </Button>
              </Flex>
              <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>

                <Text
                  color="white"
                  fontSize="xl"
                  fontWeight="semibold"
                  ml="2"
                  lineHeight="1.1"
                >
                  {provider.shortAddress}
                </Text>{provider.jazzicon}
              </Flex>
              <Flex alignContent="center" m={3}>
                <Button
                  onClick={() => {navigator.clipboard.writeText(provider.address)}}
                  variant="link"
                  color="gray.400"
                  fontWeight="normal"
                  fontSize="sm"
                  _hover={{
                    textDecoration: "none",
                    color: "whiteAlpha.800",
                  }}
                >
                  <CopyIcon mr={1} />
                  Copy Address
                </Button>
                <Link
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                  href={`https://polygonscan.com/address/${provider.address}`}
                  isExternal
                  color="gray.400"
                  ml={6}
                  _hover={{
                    color: "whiteAlpha.800",
                    textDecoration: "underline",
                  }}
                >
                  <ExternalLinkIcon mr={1} />
                  View on Explorer
                </Link>
              </Flex>
            </Box>
          </ModalBody>

          <ModalFooter
            justifyContent="end"
            background="gray.700"
            borderBottomLeftRadius="3xl"
            borderBottomRightRadius="3xl"
            p={6}
          >
            <Text
              color="white"
              textAlign="left"
              fontWeight="medium"
              fontSize="md"
            >
              Your transactions will appear here...
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        display="flex"
        alignItems="center"
        background="gray.700"
        borderRadius="xl"
        py="0"
      >{}
        <Box px="3">
          <Text color="white" fontSize="md">
            {parseFloat(provider.etherBalance as string).toFixed(4)} {provider.symbol}
          </Text>
        </Box>
        <Button
          onClick={handleOpenModal}
          bg="gray.800"
          border="1px solid transparent"
          _hover={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "blue.400",
            backgroundColor: "gray.700",
          }}
          borderRadius="xl"
          m="1px"
          px={3}
          height="38px"
        >
          <Text color="white" fontSize="md" fontWeight="medium" mr="2">
            {provider.shortAddress}
          </Text>
          {provider.jazzicon}
        </Button>
      </Box></>
    )
  }

}
