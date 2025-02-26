import type { Chain } from "../src/types";
export default {
  "name": "Chiliz Chain",
  "chain": "CC2",
  "rpc": [
    "https://chiliz-chain.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://rpc.ankr.com/chiliz",
    "https://rpc.chiliz.com"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Chiliz",
    "symbol": "CHZ",
    "decimals": 18
  },
  "infoURL": "https://chiliz.com/chiliz-chain-2-0/",
  "shortName": "cc2",
  "chainId": 88888,
  "networkId": 88888,
  "explorers": [
    {
      "name": "cc2scan",
      "url": "https://scan.chiliz.com",
      "standard": "EIP3091"
    }
  ],
  "icon": {
    "url": "ipfs://QmTGYofJ8VLkeNY4J69AvXi8e126kmbHmf34wLFoJ1FKAK",
    "width": 400,
    "height": 400,
    "format": "png"
  },
  "testnet": false,
  "redFlags": [
    "reusedChainId"
  ],
  "slug": "chiliz-chain"
} as const satisfies Chain;