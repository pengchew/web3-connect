import { Button, Box, Text } from "@chakra-ui/react";
import Identicon from "./Identicon";
import Web3 from 'web3';
import { useEffect, useState } from "react";
import { getConnector } from "../App";
declare let window: any;

type Props = {
  handleOpenModal: any;
};

export default function ConnectButton({ handleOpenModal }: Props) {
  const web3:any = new Web3(window.ethereum)
  // const connector = connect();

  const[connector,setconnector]=useState<{
    address:any,
    networkId:any,
    weiBalance:number|string,
    etherBalance:number|string,
  }>({
    address:'',
    networkId:'',
    weiBalance:'',
    etherBalance:'',
  })
  async function handleConnectWallet() {
      connect()
  }
  async function connect() {
      setconnector(await getConnector())
  }


  useEffect(()=>{
    window.ethereum.on("accountsChanged", async () => {
      setconnector({...await getConnector()})
    });
    window.ethereum.on("chainChanged", async () => {
      setconnector({...await getConnector()})
    });
  },[])
  return connector.address ? (
    <Box
      display="flex"
      alignItems="center"
      background="gray.700"
      borderRadius="xl"
      py="0"
    >{}
      <Box px="3">
        <Text color="white" fontSize="md">
          {connector.etherBalance} ETH
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
          {connector.address &&
            `${connector.address.slice(0, 6)}...${connector.address.slice(
              connector.address.length - 4,
              connector.address.length
            )}`}
        </Text>
        <Identicon />
      </Button>
    </Box>
  ) : (
    <Button
      onClick={handleConnectWallet}
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
    </Button>
  );
}
