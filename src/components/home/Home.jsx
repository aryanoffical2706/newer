import React from 'react';
import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  Container,
  Card,
  Divider,
  ButtonGroup,
  Button,
  Flex,
  CardBody

} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from '../../assets/im1.png';
import img2 from '../../assets/im2.png';
import img3 from '../../assets/im3.webp';
import im4 from '../../assets/im4.jpeg';
const headingOption = {
  pos: 'absolute',
  left: '50%',
  top: '13%',
  transform: 'translate(-50%,-50%)',
  textTransform: 'uppercase',
  p: '4',
  size: '2xl',
};

const Home = () => {
  return (
    <>
      <MyCarousel />
      <div className='home' id='about' style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between",marginBottom:"80px", marginTop:'30px' }}>
        <MyCard src={img2} price={"₹100/hr"} headline={"Type-A"} />
        <MyCard src={img3} price={"₹80/hr"}  headline={"Type-B"} />
        <MyCard src={img1} price={"₹50/hr"}  headline={"Type-C"} />
      </div>
      <Card  marginBottom={10}>
  <CardBody>
   <Image src={im4} height={350} width={1800}></Image>
  </CardBody>
</Card>
    </>
  );
};

const MyCarousel = () => (
  <Carousel showArrows={false} showThumbs={false} autoPlay infiniteLoop interval={2000} showStatus={false}>
    <Box width="full" >
      <Image src={img2} />
      <Heading  color="black" {...headingOption} fontFamily={"Roboto Condensed"}>
        A
      </Heading>
    </Box>
    <Box width="full" height="100vh">
      <Image src={img3} minW={2000} />
      <Heading  color="black" {...headingOption} fontFamily={"Roboto Condensed"}>
        B
      </Heading>
    </Box>
    <Box width="full" height="100vh">
      <Image src={img1} />
      <Heading  color="black" {...headingOption} fontFamily={"Roboto Condensed"}>
        C
      </Heading>
    </Box>
  </Carousel>
);

const MyCard = ({ src,price,headline }) => (
  <Card maxW="md" >
    <Flex flexDirection="column">
      <Image src={src} alt="Green double couch with wooden legs" borderRadius="lg"   maxH="220px" />
      <Stack mt="6" spacing="3">
        <Heading ml={2} size="md">{headline}</Heading>
        <Text ml={2}>
          This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces,
          and for people who love a chic design with a sprinkle of vintage design.
        </Text>
        <Text ml={2} color="blue.600" fontSize="2xl">
          {price}
        </Text>
      </Stack>
    </Flex>
    <Divider />
    <ButtonGroup spacing="2">
      <Button ml={1} mt={3} variant="solid" colorScheme="blue">
        <Link to="/booking">
        Book Now</Link>
       
        
      
      </Button>
    
    </ButtonGroup>
  </Card>
);

export default Home;
