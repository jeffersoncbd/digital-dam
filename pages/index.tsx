import React, { useContext } from 'react'
import { Flex, Heading, Box } from '@chakra-ui/core'
import TokenForm from '../components/TokenForm'
import SwitchAutomation from '../components/automations/Switch'
import { DigitalOceanToken } from '../contexts/DigitalOceanToken'

const Home: React.FC = () => {
  const tokenContext = useContext(DigitalOceanToken)

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

      {tokenContext._token && (
        <Box marginTop={5}>
          <SwitchAutomation />
        </Box>
      )}
    </Flex>
  )
}

export default Home
