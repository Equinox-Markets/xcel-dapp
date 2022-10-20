import { ChainState } from '@/store/lib/ChainState';
import { CoinState } from '../store/lib/CoinState';

export const FTMMainnetConfig = new ChainState({
  name: 'FTM',
  chainId: 250,
  networkKey: 'ftm',
  rpcUrl: 'https://rpc.ftm.tools/',
  logoUrl: '/images/ftm.png',
  explorerURL: 'https://ftmscan.com',
  explorerName: 'FtmScan',
  Coin: new CoinState({
    symbol: 'FTM',
    decimals: 18
  }),
  info: {
    blockPerSeconds: 3,
    multicallAddr: '0xC82ECc4572321aa9F051443C30a0a0fA792b3798',
    theme: {
      bgGradient: 'linear(to-r, #84ABF5, #CFC6F9)'
    }
  }
});
