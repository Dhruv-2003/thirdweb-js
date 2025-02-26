import type { Chain } from "../src/types";
export default {
  "name": "Ultron Testnet",
  "chain": "Ultron",
  "icon": {
    "url": "ipfs://QmPC6odFVyAQrXJQaZJVFpEQfRNbzZ5BjDZ7KBKmXPaYDw",
    "width": 512,
    "height": 512,
    "format": "png"
  },
  "rpc": [
    "https://ultron-testnet.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://ultron-dev.io"
  ],
  "faucets": [],
  "nativeCurrency": {
    "name": "Ultron",
    "symbol": "ULX",
    "decimals": 18
  },
  "infoURL": "https://ultron.foundation",
  "shortName": "UltronTestnet",
  "chainId": 1230,
  "networkId": 1230,
  "explorers": [
    {
      "name": "Ultron Testnet Explorer",
      "url": "https://explorer.ultron-dev.io",
      "icon": {
        "url": "ipfs://QmPC6odFVyAQrXJQaZJVFpEQfRNbzZ5BjDZ7KBKmXPaYDw",
        "width": 512,
        "height": 512,
        "format": "png"
      },
      "standard": "none"
    }
  ],
  "testnet": true,
  "slug": "ultron-testnet"
} as const satisfies Chain;