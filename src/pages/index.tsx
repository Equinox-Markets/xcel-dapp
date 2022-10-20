import React from 'react';
import { observer } from 'mobx-react-lite';
import Link from "next/link"
import { Box, Container, LinkBox, SimpleGrid, LinkOverlay, Stack, Alert, Image, Link as ChakraLink } from '@chakra-ui/react';
import { ToolConfig } from '../config/ToolConfig';
import { Badge, Flex, Text } from '@chakra-ui/layout';
import { useStore } from '@/store/index';

export const Home = observer(() => {

  const { lang } = useStore()

  const links = [
    { text: 'GitHub |', url: 'https://github.com/iotexproject/iotex-dapp-sample-v2' },
    { text: `${lang.t('issues')} |`, url: 'https://github.com/iotexproject/iotex-dapp-sample-v2/issues' },
    { text: `${lang.t('use.template')}`, url: 'https://github.com/iotexproject/iotex-dapp-sample-v2/generate' }
  ];

  return (
    <Container maxW='7xl'>
      <Flex justifyContent={'center'} alignItems={'center'} mt={10} flexDirection={'column'}>
        <ChakraLink href='https://github.com/iotexproject/iotex-dapp-sample-v2' isExternal>
          <Image src={'images/v2.png'} w={'100%'} />
        </ChakraLink>
        <Text mt={5}>
          IoTeX Dapp {lang.t('sample')} V2
        </Text>
        <Flex mt={5}>
          {
            links.map(link => {
              return (
                <ChakraLink href={link.url} isExternal key={link.text} ml={2} _first={{ ml: 0 }} _hover={{}}>
                  <Text>
                    {link.text}
                  </Text>
                </ChakraLink>
              );
            })
          }
        </Flex>
      </Flex>
      <SimpleGrid minChildWidth='200px' spacing='10px' py='6'>
        {ToolConfig.map((i) => (
          <Link key={i.path} href={i.path} as={`${i.path}.html`} passHref>
            <ChakraLink w='200px' p='4' borderWidth='1px' rounded='md' key={i.name} textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Text>{lang.t(i.name)}</Text>
              {i.tags && (
                <Stack direction='row' mt='2'>
                  {i.tags.map((i) => (
                    <Badge key={i} variant='outline' colorScheme='green'>
                      {i}
                    </Badge>
                  ))}
                </Stack>
              )}
            </ChakraLink>
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );
});

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Footer With Animation</title>
    <link rel="stylesheet" href="/Style.css">
    <script src="https://kit.fontawesome.com/bd98b2401b.js" ></script>
</head>
<body>
    <footer>
        <div class="row">
            <div class="col">
                <img src="rishi.png" class="logo">
                <p>What would you say about this design is it really awesome or not.</p>

            </div>
            <div class="col">
                <h3>Office <div class="underline"><span></span></div></h3>
                <p>Zone no-11, Holding No-10</p>
                <p>Birsanagar, Telco Colony</p>
                <p>Jamshedpur, Pin-831004, Jharkhand</p>
                <p class="email-id">rishisinghrajputr2@gmail.com</p>
                <h4>+91-620123456</h4>
            </div>
            <div class="col">
                <h3>Links<div class="underline"><span></span></div></h3>
                <ul>
                    <li> <a href="">Home</a></li>
                    <li> <a href="">Services</a></li>
                    <li> <a href="">Features</a></li>
                    <li> <a href="">About Us</a></li>
                    <li> <a href="">Contacts</a></li>
                </ul>
            </div>
            <div class="col">
                <h3>NewsLetter<div class="underline"><span></span></div></h3>
                <form >
                    <i class="fa-solid fa-envelope"></i>
                    <input type="email" placeholder="Enter your email-id" required>
                    <button type="submit"><i class="fa-solid fa-arrow-right"></i></button>
                </form>
                <div class="social-icons">
                    <i class="fa-brands fa-whatsapp"></i>
                    <i class="fa-brands fa-facebook"></i>
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-twitter"></i>
                </div>
            </div>
        </div>
        <hr>
        <p class="copyright">Rishi's animation @ 2022 -All Rights Reserved</p>
    </footer>
</body>
</html>

export default Home
