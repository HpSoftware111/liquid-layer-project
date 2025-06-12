import Web3 from 'web3'


import { RPC_URLS } from 'constants/connectors';


const httpProvider = (chainId) => {

    return new Web3.providers.HttpProvider(chainId ? RPC_URLS[chainId] : RPC_URLS[1], { timeout: 10000 })
}

/**
 * Provides a web3 instance using our own private provider httpProver
 */
const getWeb3 = (chainId) => {
    const web3 = new Web3(httpProvider(chainId))

    return web3
}

const getContract = (abi, address) => {
    const web3 = getWeb3()
    return new web3.eth.Contract(abi, address)
}

export { getWeb3, getContract, httpProvider }
