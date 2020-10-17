import React from 'react'
import { DropletEntity } from '../../entities/Droplet'
import { Heading, Flex } from '@chakra-ui/core'
import Lamp from '../Lamp'

interface ShowDropletProperties {
  droplet: DropletEntity
}

const ShowDroplet: React.FC<ShowDropletProperties> = ({ droplet }) => (
  <Flex alignItems="center">
    <Heading size="md" marginRight={2}>
      {droplet.name}
    </Heading>
    <Lamp status={droplet.status} />
  </Flex>
)

export default ShowDroplet
