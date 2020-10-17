import React from 'react'
import { Flex, Heading } from '@chakra-ui/core'
import TokenForm from '../components/TokenForm'
import Droplets from '../components/Droplets'

const Home: React.FC = () => {
  return (
    <Flex
      width="full"
      marginX="auto"
      maxWidth="800px"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h1" textAlign="center" size="2xl" marginTop={10}>
        DigitalDam
      </Heading>

      <TokenForm />

      <Droplets />
    </Flex>
  )
}

export default Home
