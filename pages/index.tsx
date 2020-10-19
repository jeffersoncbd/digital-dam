import React from 'react'
import { Flex, Heading, Box } from '@chakra-ui/core'
import TokenForm from '../components/TokenForm'
import SwitchAutomation from '../components/automations/Switch'

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

      <Box marginTop={5}>
        <SwitchAutomation />
      </Box>
    </Flex>
  )
}

export default Home
