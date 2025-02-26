import type { Chain } from "../src/types";
export default {
  "name": "ThunderCore Mainnet",
  "chain": "TT",
  "rpc": [
    "https://thundercore.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://mainnet-rpc.thundercore.com",
    "https://mainnet-rpc.thundertoken.net",
    "https://mainnet-rpc.thundercore.io"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "ThunderCore Token",
    "symbol": "TT",
    "decimals": 18
  },
  "infoURL": "https://thundercore.com",
  "shortName": "TT",
  "chainId": 108,
  "networkId": 108,
  "slip44": 1001,
  "explorers": [
    {
      "name": "thundercore-viewblock",
      "url": "https://viewblock.io/thundercore",
      "standard": "EIP3091"
    }
  ],
  "testnet": false,
  "slug": "thundercore"
} as const satisfies Chain;