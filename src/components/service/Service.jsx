import React from 'react';
import {
  Box,
  Heading,
  VStack,
  Text,
  SimpleGrid,
  Flex,
  Image,
  Button,
} from '@chakra-ui/react';
import brea from '../../assets/break.webp';
import lunch from '../../assets/lunch.avif';
import dinn from '../../assets/dinner.jpeg';
import cand from '../../assets/candel.jpeg';
import { Link } from 'react-router-dom';
const Service = () => {
  const services = [
    {
      title: 'Breakfast',
      description: 'Start your day with a delicious and nutritious breakfast served with love.',
      imageUrl: brea,
    },
    {
      title: 'Lunch',
      description: 'Savor a variety of mouth-watering lunch options prepared to perfection by our chefs.',
      imageUrl: lunch,
    },
    {
      title: 'Dinner',
      description: 'Indulge in a delightful dinner experience with our exquisite menu and cozy ambiance.',
      imageUrl: dinn,
    },
    {
      title: 'Candlelight Dinner',
      description: 'Create unforgettable memories with a romantic candlelight dinner, perfect for special occasions.',
      imageUrl: cand,
    },
  ];

  return (
    <Box marginTop={10} py={16} bg="gray.100">
      <VStack spacing={8}>
        <Heading textAlign="center" color={"black"} fontSize="4xl" fontFamily={"Roboto Condensed"}>
          Our Services
        </Heading>
        <Text textAlign="center" color={"black"} fontSize="lg" fontFamily={"Roboto Condensed"}>
          Enjoy a delightful dining experience with our range of services tailored just for you.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mt={8} mx="auto">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

const ServiceCard = ({ title, description, imageUrl }) => (
  <Box maxW="lg" mx="auto" p={6} bg="white" borderRadius="lg" boxShadow="lg">
    <Image src={imageUrl} alt={title} mb={4} borderRadius="md" maxH="170px" width={"full"} />
    <Heading fontSize="xl" mb={2} color={"black"} fontFamily={"Roboto Condensed"}>
      {title}
    </Heading>
    <Text fontSize="md" textAlign="justify" color="gray.600" fontFamily={"Roboto Condensed"}>
      {description}
    </Text>
    <Button ml={1} mt={3} variant="solid" colorScheme="blue">
        <Link to="/booking">
        Book Now</Link>   </Button>
  </Box>
);

export default Service;
