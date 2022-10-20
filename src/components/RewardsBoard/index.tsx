import spartanAbi from '@/constants/abi/spartan.json';
import TokenState from '@/store/lib/TokenState';
import { BooleanState } from '@/store/standard/base';
import { BigNumberState } from '@/store/standard/BigNumberState';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Container, Divider, Flex, Grid, GridItem, Icon, Link, SimpleGrid, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { action, reaction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';
import { BiWallet } from "react-icons/bi";
import { useStore } from '../../store/index';
import { CurrencyLoader } from '../CurrencyLoader';


export const RewardsBoard = observer(() => {
  const { god, currencies } = useStore();
  const store = useLocalObservable(() => ({
    spartanToken: new TokenState({ address: "0xbcfe392E778dbB59DcAd624F10f7fa8C4a910B1e", abi: spartanAbi, fixed: 6, numeralFormat: '0[.]00' }),
    knightToken: new TokenState({ address: "0xd23811058eb6e7967d9a00dc3886e75610c4abba", abi: spartanAbi, fixed: 6, numeralFormat: '0[.]00' }),
    totalDividendsDistributed: new BigNumberState({ fixed: 6, loading: true, numeralFormat: '0[.]00' }),
    accountTotalDividendsDistributed: new BigNumberState({ fixed: 6, loading: true, numeralFormat: '0[.]00' }),
    accountWithdrawableDividends: new BigNumberState({ fixed: 6, loading: true, numeralFormat: '0[.]00' }),
    darkSpartanToken: new TokenState({ address: "0x63aad0448f58ae1b98d75456cfc6f39235e353f6", abi: spartanAbi, fixed: 6, numeralFormat: '0[.]00' }),
    darkKnightToken: new TokenState({ address: "0x6cc0e0aedbbd3c35283e38668d959f6eb3034856", abi: spartanAbi, fixed: 6, numeralFormat: '0[.]00' }),
    darkTotalDividendsDistributed: new BigNumberState({ fixed: 6, loading: true, numeralFormat: '0[.]00' }),
    darkAccountTotalDividendsDistributed: new BigNumberState({ fixed: 6, loading: true, numeralFormat: '0[.]00' }),
    darkAccountWithdrawableDividends: new BigNumberState({ fixed: 6, loading: true, numeralFormat: '0[.]00' }),
    isQualifiedForRewards: new BooleanState({ value: true }),
    isQualifiedForDarkRewards: new BooleanState({ value: true }),
    resetWalletLoaders() {
      this.spartanToken._balance.loading = true;
      this.darkSpartanToken._balance.loading = true;
      this.knightToken._balance.loading = true;
      this.darkKnightToken._balance.loading = true;
      this.accountTotalDividendsDistributed.loading = true;
      this.accountWithdrawableDividends.loading = true;
      this.darkAccountTotalDividendsDistributed.loading = true;
      this.darkAccountWithdrawableDividends.loading = true;
    },
    async updateCommonData() {
      await god.bscNetwork.multicall(
        [
          store.spartanToken.preMulticall({ method: 'getTotalDividendsDistributed', handler: action('setTotalDividendsDistributed', (v: any) => (store.totalDividendsDistributed.setValue(new BigNumber(v.toString())))) })
        ].filter((i) => !!i)
      );
      await god.ftmNetwork.multicall(
        [
          store.darkSpartanToken.preMulticall({ method: 'getTotalDividendsDistributed', handler: action('setTotalDividendsDistributed', (v: any) => (store.darkTotalDividendsDistributed.setValue(new BigNumber(v.toString())))) })
        ].filter((i) => !!i)
      );
    },
    async updateDataForWallet() {
      const val = god.trackedWalletAddress.value;
      if (god.currentNetwork.isAddress(val)) {
        await god.bscNetwork.multicall(
          [
            store.spartanToken.preMulticall({
              method: 'getAccountDividendsInfo', params: [val], handler: action('setAccountDividendsInfo', (v: any) => {
                store.accountTotalDividendsDistributed.setValue(new BigNumber(v.totalDividends.toString()));
                store.accountWithdrawableDividends.setValue(new BigNumber(v.withdrawableDividends.toString()));
              })
            }),
            store.spartanToken.preMulticall({ method: 'balanceOf', params: [val], handler: action('setBalance', (v: any) => (store.spartanToken._balance.setValue(new BigNumber(v.toString())))) }),
            store.knightToken.preMulticall({ method: 'balanceOf', params: [val], handler: action('setBalance', (v: any) => (store.knightToken._balance.setValue(new BigNumber(v.toString())))) })
          ].filter((i) => !!i)
        );
        await god.ftmNetwork.multicall(
          [
            store.darkSpartanToken.preMulticall({
              method: 'getAccountDividendsInfo', params: [val], handler: action('setAccountDividendsInfo', (v: any) => {
                store.darkAccountTotalDividendsDistributed.setValue(new BigNumber(v.totalDividends.toString()));
                store.darkAccountWithdrawableDividends.setValue(new BigNumber(v.withdrawableDividends.toString()));
              })
            }),
            store.darkSpartanToken.preMulticall({ method: 'balanceOf', params: [val], handler: action('setBalance', (v: any) => (store.darkSpartanToken._balance.setValue(new BigNumber(v.toString())))) }),
            store.darkKnightToken.preMulticall({ method: 'balanceOf', params: [val], handler: action('setBalance', (v: any) => (store.darkKnightToken._balance.setValue(new BigNumber(v.toString())))) })
          ].filter((i) => !!i)
        );
      }
    }
  }));

  useEffect(() => {
    reaction(
      () => god.currentNetwork.account,
      account => {
        if (god.currentNetwork.account) {
          god.trackedWalletAddress.setValue(account);
        }
      });

    reaction(
      () => god.trackedWalletAddress.value,
      async (val) => {
        store.resetWalletLoaders();
        store.updateCommonData();
        store.updateDataForWallet();
      });

    reaction(
      () => store.spartanToken._balance.value,
      val => {
        action('setQualifiedForRewards', () => (store.isQualifiedForRewards.setValue(val.gte(new BigNumber(50000 * (10 ** 18))) || val.lte(new BigNumber(0)))))();
      });

    reaction(
      () => store.darkSpartanToken._balance.value,
      val => {
        action('setQualifiedForDarkRewards', () => (store.isQualifiedForDarkRewards.setValue(val.gte(new BigNumber(50000 * (10 ** 18))) || val.lte(new BigNumber(0)))))();
      });

    setInterval(() => {
      store.updateCommonData();
      store.updateDataForWallet();
    }, 10 * 60 * 1000);

    store.updateCommonData();
  }, []);



  return (
    <Container maxW="10xl" pb={12}>
      <VStack direction={['column', 'row']} spacing='24px'>
        <SimpleGrid w='100%' minChildWidth='180px' spacing={12}>

          <VStack spacing='4px'>
            <Text fontSize='xx-large' >In your wallet</Text>
            <Box w='100%' p={4} borderWidth='1px' borderRadius='lg'>
              <Flex align={'left'}>
                <Icon as={BiWallet} boxSize={8} />
              </Flex>
              <CurrencyLoader number={store.spartanToken._balance} imageRef='images/spartans.png' coinPrice={currencies.spartanCoinPrices} />
              <CurrencyLoader number={store.knightToken._balance} imageRef='images/knight-icon.png' coinPrice={currencies.knightCoinPrices} />
              <CurrencyLoader number={store.darkSpartanToken._balance} imageRef='images/dark-spartans.png' coinPrice={currencies.darkSpartanCoinPrices} />
              <CurrencyLoader number={store.darkKnightToken._balance} imageRef='images/dKNIGHT.svg' coinPrice={currencies.darkKnightCoinPrices} />
            </Box>
            <Text align={'center'}
              hidden={store.isQualifiedForRewards.value}>
              You need to hold at least 50,000 Spartan tokens in your wallet to qualify for receiving rewards.
              Buy more tokens on{' '}
              <Link
                href='https://dex.knightswap.financial/#/swap'
                color='teal.500'
                isExternal>KnightSwap <ExternalLinkIcon mx='2px' /></Link>.
            </Text>
            <Text align={'center'}
              hidden={store.isQualifiedForDarkRewards.value}>
              You need to hold at least 50,000 Dark Spartan tokens in your wallet to qualify for receiving rewards.
              Buy more tokens on{' '}
              <Link
                href='https://darkdex.knightswap.financial/#/swap'
                color='teal.500'
                isExternal>Dark KnightSwap <ExternalLinkIcon mx='2px' /></Link>.
            </Text>
          </VStack>

          <Grid >
            <GridItem w='100%'>
              <Text align={'center'} fontSize='xx-large'>Your Rewards</Text>
            </GridItem>
            <GridItem w='100%'>
              <Text align='center' fontSize='x-large'>Total earned</Text>
              <CurrencyLoader number={store.accountTotalDividendsDistributed} imageRef='images/knight-icon.png' coinPrice={currencies.knightCoinPrices} />
              <CurrencyLoader number={store.darkAccountTotalDividendsDistributed} imageRef='images/dKNIGHT.svg' coinPrice={currencies.darkKnightCoinPrices} />
            </GridItem>
            <GridItem w='100%'>
              <Text align='center' fontSize='x-large'>Accumulating Rewards (pending)</Text>
              <CurrencyLoader number={store.accountWithdrawableDividends} imageRef='images/knight-icon.png' coinPrice={currencies.knightCoinPrices} />
              <CurrencyLoader number={store.darkAccountWithdrawableDividends} imageRef='images/dKNIGHT.svg' coinPrice={currencies.darkKnightCoinPrices} />
            </GridItem>
          </Grid>


        </SimpleGrid>
        <Divider />
        <Box>
          <Text fontSize='xx-large'>Total Rewards Distributed to Holders</Text>
          <Wrap align='center' spacing='20px' justify='center'>
            <WrapItem>
              <CurrencyLoader number={store.totalDividendsDistributed} imageRef='images/knight-icon.png' coinPrice={currencies.knightCoinPrices} />
            </WrapItem>
            <WrapItem>
              <CurrencyLoader number={store.darkTotalDividendsDistributed} imageRef='images/dKNIGHT.svg' coinPrice={currencies.darkKnightCoinPrices} />
            </WrapItem>
          </Wrap>
        </Box>

        <Divider />

        <Text align={'justify'}>
          Reflections depend on trade volume to gas fee. Rewards are going to be accumulating in the background.
        </Text>
        <Text align={'justify'}>
          However it needs to hit a certain threshold to justify gas fees to airdrop rewards. Larger holders will hit that threshold sooner but that does not impact lower holders rewards as they still accumulate.
        </Text>

        <Text align={'justify'}>
          All you need to know about Spartan token, reflections and how to compound your investment can be found in the{' '}
          <Link
            href='https://info-121.gitbook.io/welcome-to-the-spartan-army/'
            color='teal.500'
            isExternal>Spartan whitepaper<ExternalLinkIcon mx='2px' /></Link>{' '} for BSC and <Link
              href='https://info-121.gitbook.io/spartans-army-ftm/'
              color='teal.500'
              isExternal>Dark Spartan whitepaper<ExternalLinkIcon mx='2px' /></Link>{' '} for Fantom.
        </Text>
      </VStack >
    </Container >
  );
});