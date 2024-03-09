import { Box, Button, HStack, Heading, Input, Link, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { AiFillYoutube, AiOutlineSend } from 'react-icons/ai'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
    <Box id='brand' minH={40} p={16} color={"white"}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={'stretch'} width={'full'} px={4} >
          <Heading textAlign={'center'} marginBottom="10px">
            Top View Hotel
          </Heading>
          <HStack align={"flex-start"} spacing={20}>
            <VStack align={"flex-start"}>
              <Link>Top View Manali</Link>
              <Link>Top View Shimla</Link>
              <Link>Top View Coorg</Link>
              <Link>Top View Mysore</Link>
              <Link>Top View Gangtok </Link>
              <Link>Top View Darjeeling</Link>
            </VStack>
            <VStack align={"flex-start"}>
              <Link>Top View Mumbai</Link>
              <Link>Top View Delhi</Link>
              <Link>Top View Chennai </Link>
              <Link>Top View Patna</Link>
              <Link>Top View Bengaluru</Link>
              <Link>Top View Kolkata</Link>
            </VStack>
          </HStack>

        </VStack>
        <VStack w={'full'} borderLeft={['none', '1px solid white']} borderRight={['none', '1px solid white']}>
        <Heading fontSize="lg">All Rights Reserved</Heading>
  <Text fontSize="sm" padding={4}>
    &copy; 2024 Top View Hotel. All rights reserved. This website and its content are protected
    by international copyright laws.Unauthorized reproduction or distribution of any material
    from this site is strictly prohibited.
  </Text>
  <Text fontSize="sm" mt={2} paddingLeft={4} paddingRight={4}>
    Disclaimer: This is a fictional website created for demonstration purposes only. Any resemblance
    to real persons, living or dead, is purely coincidental.
  </Text>
        </VStack>
        <VStack w={'full'}>
          <Heading size={'md'} textTransform={'uppercase'}>
            Social Media
          </Heading>
          <Button variant={'link'} colorScheme='white' size='lg'>
            <a href='https://www.youtube.com/channel/UC61Eb4o3HF7jZzODddDFm1Q'> <AiFillYoutube size={40} /></a>

          </Button>
          <Button variant={'link'} colorScheme='white' size='md'>
            <a href='https://www.instagram.com/_aryan_official_27?igsh=MXhoMjZvY3l2ZjJxbQ=='> <FaInstagram size={40}/></a>

          </Button>
          <Button variant={'link'} colorScheme='white' size='md'>
            <a href='https://www.linkedin.com/in/aryan-singh-a4994122a'> <FaLinkedin size={40}/></a>

          </Button>
          <Button variant={'link'} colorScheme='white' size='md'>
            <a href='https://www.facebook.com/profile.php?id=100008370372830&mibextid=2JQ9oc'> <FaFacebook size={40}/></a>

          </Button>
          <Button variant={'link'} colorScheme='white' size='md'>
            <a href='https://x.com/aryan52649?t=P5j8TmgL340EYL-nCXcKPg&s=08'> <FaTwitter size={40}/></a>

          </Button>

        </VStack>
      </Stack>
    </Box>
  )
}

export default Footer
