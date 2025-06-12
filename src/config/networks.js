export const CHAINS = {
    1: {
        chainId: 1,
        chainName: "ETH Mainnet",
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: [
            "https://eth-mainnet.alchemyapi.io/v2/j7DwtdhVpRlzmRijCLmooEyQOXmAT9zX"
        ],
        blockExplorerUrls: "https://etherscan.io",
    },
    5: {
        chainId: 5,
        chainName: "Goerly",
        nativeCurrency: {
            name: 'gETH',
            symbol: 'gETH',
            decimals: 18,
        },
        rpcUrls: [
            "https://eth-goerli.alchemyapi.io/v2/j7DwtdhVpRlzmRijCLmooEyQOXmAT9zX"
        ],
        blockExplorerUrls: "https://goerli.etherscan.io",
    },
    56: {
        chainId: 56,
        chainName: "BNB Smart Chain",
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
        },
        rpcUrls: [
            "https://bsc-dataseed.binance.org",
            "https://bsc-dataseed1.binance.org",
        ],
        blockExplorerUrls: "https://bscscan.com",
    },
    97: {
        chainId: 97,
        chainName: "tBNB Smart Chain",
        nativeCurrency: {
            name: 'tBNB',
            symbol: 'tBNB',
            decimals: 18,
        },
        rpcUrls: [
            "https://data-seed-prebsc-1-s1.binance.org:8545",
            "https://data-seed-prebsc-2-s1.binance.org:8545",
        ],
        blockExplorerUrls: "https://testnet.bscscan.com",
    },
    770077: {
        chainId: 770077,
        chainName: "GROVE Smart Chain",
        nativeCurrency: {
            name: 'GRV',
            symbol: 'GRV',
            decimals: 18,
        },
        rpcUrls: [
            "https://mainnet.grovechain.io",
        ],
        blockExplorerUrls: "https://grvscan.io",
    },
};

export const CHAIN_ICONS = {
    1: '/icons/etherscan.png',
    5: '/icons/etherscan.png',
    56: '/icons/bscscan.png',
    97: '/icons/bscscan.png',
}

export const tokens = {
    1: {
        address: '0xF33893DE6eB6aE9A67442E066aE9aBd228f5290c',
        chainId: 1,
        symbol: 'LDR',
        name: 'Liquid Layer Coin',
    },
    56: {
        address: '0xF33893DE6eB6aE9A67442E066aE9aBd228f5290c',
        chainId: 56,
        symbol: 'LDR',
        name: 'LiquidLayer Coin',
    },
    5: {
        address: '0x401e7e28e0C679E1a3242ac6CD93C9c56208A260',
        chainId: 5,
        symbol: 'LDR',
        name: 'LiquidLayer Coin',
    },
    97: {
        address: '0xe85f139488c689038028a3eb8fc38dcc29d4c340',
        chainId: 97,
        symbol: 'LDR',
        name: 'LiquidLayer Coin',
    }
}

export const bridgeConfig = {
    homeChainId: 1,
    foreignChainId: 56,
    homeToken: tokens[1],
    foreignToken: tokens[56],
    // homeChainId: 5,
    // foreignChainId: 97,
    // homeToken: tokens[5],
    // foreignToken: tokens[97],
    enableForeignCurrencyBridge: false,
    homeWrappedForeignCurrencyAddress: null,
    wrappedForeignCurrencyAddress: null,
    foreignMediatorAddress: "0xB62Af5cA1a36D958c7EC444d7421b9977DDa9aBB".toLowerCase(),
    homeMediatorAddress: "0x2Bfef7eE6098B4eE566d7B74fee73B449Bb021b2".toLowerCase(),
    foreignAmbAddress: "0x0Cf3e760d33d3d11482DC4EA79F23EA62783c06c".toLowerCase(),
    homeAmbAddress: "0xBeb1840DE0E2440576BDC10D60b12B3832922060".toLowerCase(),
    foreignGraphName: "brainstormk/grove-bridge-bsc",
    homeGraphName: "brainstormk/grove-bridge-mainnet",
    ambLiveMonitorPrefix: "http://alm-bsc.herokuapp.com",
    claimDisabled: false,
    tokensClaimDisabled: [],
};


export const migrationConfig = {
    1: {
        chainId: 1,
        contract: "0xDfCc050D7AB45E8E345296Ff94194A807cfE8fcc",
        tokens: {
            "0x84FA8f52E437Ac04107EC1768764B2b39287CB3e": {
                chainId: 1,
                address: "0x84FA8f52E437Ac04107EC1768764B2b39287CB3e",
                name: "Grove",
                rate: "100000000000000000",
                mediator: "0xDfCc050D7AB45E8E345296Ff94194A807cfE8fcc",
                symbol: "GVR",
                decimals: 18,
            }
        },
        goal: {
            address: "0xF33893DE6eB6aE9A67442E066aE9aBd228f5290c",
            symbol: "GRV",
            name: "GroveC"
        }
    },
    56: {
        chainId: 56,
        contract: "0x118fa9297F4E2cBB310133A8aAa695f0e14D04c3",
        tokens: {
            /*
            "0x55d398326f99059fF775485246999027B3197955": {
                chainId: 56,
                address: "0x55d398326f99059fF775485246999027B3197955",
                name: "USDT",
                rate: 1000000000000000,
                mediator: "0x118fa9297F4E2cBB310133A8aAa695f0e14D04c3",
            },
            "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56": {
                chainId: 56,
                address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
                name: "BUSD",
                rate: 1000000000000000,
                mediator: "0x118fa9297F4E2cBB310133A8aAa695f0e14D04c3",
            },
            */
            "0xaFb64E73dEf6fAa8B6Ef9a6fb7312d5C4C15ebDB": {
                chainId: 56,
                address: "0xaFb64E73dEf6fAa8B6Ef9a6fb7312d5C4C15ebDB",
                name: "Grove",
                rate: "100000000000000000",
                mediator: "0x118fa9297F4E2cBB310133A8aAa695f0e14D04c3",
                symbol: "GVR",
                decimals: 18,
            },
            "0x64AE88A79f79A2Cf3bF032ff6b687966b09645d9": {
                chainId: 56,
                address: "0x64AE88A79f79A2Cf3bF032ff6b687966b09645d9",
                name: "CVPToken",
                // rate: 5405405,
                rate: "670000000",
                mediator: "0x118fa9297F4E2cBB310133A8aAa695f0e14D04c3",
                symbol: "CVP",
                decimals: 9,
            },
            "0x45B239Cc0a760D1AFd276B749141c7E404844Ee6": {
                chainId: 56,
                address: "0x45B239Cc0a760D1AFd276B749141c7E404844Ee6",
                name: "CommunityToken",
                rate: "200000000000000000",
                mediator: "0x118fa9297F4E2cBB310133A8aAa695f0e14D04c3",
                symbol: "COMT",
                decimals: 18,
            }
        },
        goal: {
            address: "0xF33893DE6eB6aE9A67442E066aE9aBd228f5290c",
            symbol: "GRV",
            name: "GroveC"
        }
    },
    homeChainId: 1,
    foreignChainId: 56,
    homeToken: tokens[1],
    foreignToken: tokens[56],
    enableForeignCurrencyBridge: false,
    homeWrappedForeignCurrencyAddress: null,
    wrappedForeignCurrencyAddress: null,
    foreignMediatorAddress: "0x118fa9297F4E2cBB310133A8aAa695f0e14D04c3".toLowerCase(),
    homeMediatorAddress: "0xDfCc050D7AB45E8E345296Ff94194A807cfE8fcc".toLowerCase(),
    foreignAmbAddress: "0x0Cf3e760d33d3d11482DC4EA79F23EA62783c06c".toLowerCase(),
    homeAmbAddress: "0xBeb1840DE0E2440576BDC10D60b12B3832922060".toLowerCase(),
    foreignGraphName: "brainstormk/grove-bridge-bsc",
    homeGraphName: "brainstormk/grove-bridge-mainnet",
    ambLiveMonitorPrefix: "http://alm-bsc.herokuapp.com",
    claimDisabled: false,
    tokensClaimDisabled: [],
};