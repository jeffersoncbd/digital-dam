import React, { useContext } from 'react'
import { Spinner, Heading, Flex } from '@chakra-ui/core'

import { DigitalOceanToken } from '../contexts/DigitalOceanToken'
import { UserDropletContext } from '../contexts/UserDroplets'
import Lamp from './Lamp'

const Droplets: React.FC = () => {
  const tokenContext = useContext(DigitalOceanToken)
  const dropletsContext = useContext(UserDropletContext)

  if (tokenContext._token === null) {
    return null
  }

  if (dropletsContext.droplets === undefined) {
    return (
      <Flex justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    )
  }

  return (
    <Flex marginTop={5} flexDirection="column" alignItems="center">
      <Heading>Droplets</Heading>
      {dropletsContext.droplets.map((droplet) => (
        <Flex key={droplet.id} alignItems="center" marginTop={2}>
          <Heading size="md" marginRight={2}>
            {droplet.name}
          </Heading>
          <Lamp status={droplet.status} />
        </Flex>
      ))}
    </Flex>
  )
}

export default Droplets
