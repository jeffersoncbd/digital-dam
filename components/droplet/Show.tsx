import React, { useState, useEffect, useContext } from 'react'
import { DropletEntity } from '../../entities/Droplet'
import { Heading, Flex, Spinner, useToast, Text } from '@chakra-ui/core'
import Lamp from '../Lamp'
import Axios from 'axios'
import { DigitalOceanToken } from '../../contexts/DigitalOceanToken'

interface ShowDropletProperties {
  droplet: number | DropletEntity
}

const ShowDroplet: React.FC<ShowDropletProperties> = (properties) => {
  const toast = useToast()
  const tokenContext = useContext(DigitalOceanToken)

  const [droplet, setDroplet] = useState<DropletEntity>()

  useEffect(() => {
    async function getDroplets(dropletId: number) {
      try {
        const response = await Axios.get(
          `https://api.digitalocean.com/v2/droplets/${dropletId}`,
          {
            headers: { Authorization: `Bearer ${tokenContext._token}` }
          }
        )
        setDroplet(response.data.droplet)
      } catch (error) {
        if (error.response.status === 401) {
          toast({
            title: 'DigitalOcean não autorizou',
            description: error.response.data.message,
            status: 'error',
            duration: 3000,
            isClosable: true
          })
          tokenContext.deleteToken()
        }
      }
    }
    if (typeof properties.droplet === 'number') {
      getDroplets(properties.droplet)
    } else {
      setDroplet(properties.droplet)
    }
  }, [properties.droplet])

  if (droplet === undefined) {
    return (
      <Flex justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    )
  }

  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex alignItems="center">
        <Heading size="md" marginRight={2}>
          {droplet.name}
        </Heading>
        <Lamp status={droplet.status} />
      </Flex>
      <Text>
        {droplet.vcpus} vCPUs - {Math.round(droplet.memory / 1000)}GB Memory
      </Text>
      <Text>
        Slug: {droplet.size_slug}
      </Text>
    </Flex>
  )
}

export default ShowDroplet
