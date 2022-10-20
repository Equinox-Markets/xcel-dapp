import { ChainState } from '@/store/lib/ChainState';
import { CoinState } from '../store/lib/CoinState';

export const AVAXMainnetConfig = new ChainState({
  name: 'Avalanche',
  chainId: 43114,
  networkKey: 'avax',
  rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
  logoUrl: '/https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/icon/avax.svg',
  explorerURL: 'https://snowtrace.io',
  explorerName: 'SnowTrace',
  Coin: new CoinState({
    symbol: 'AVAX',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 3,
    multicallAddr: '0x84514BeaaF8f9a4cbe25A9C5a7EBdd16B4FE7154',
    theme: {
      bgGradient: 'linear(to-r, #84ABF5, #CFC6F9)'
    }
  }
});
