import React, { useContext, useState, useEffect } from 'react'
import { Spinner, Heading, Flex, useToast } from '@chakra-ui/core'

import { DropletEntity } from '../../entities/Droplet'

import { DigitalOceanToken } from '../../contexts/DigitalOceanToken'
import Lamp from '../Lamp'
import Axios from 'axios'

interface DropletListProperties {
  handleSelectDroplet?: (droplet: DropletEntity) => void
}

const DropletList: React.FC<DropletListProperties> = ({
  handleSelectDroplet
}) => {
  const toast = useToast()
  const tokenContext = useContext(DigitalOceanToken)

  const [droplets, setDroplets] = useState<DropletEntity[]>()

  useEffect(() => {
    async function getDroplets() {
      try {
        const response = await Axios.get(
          'https://api.digitalocean.com/v2/droplets',
          {
            headers: { Authorization: `Bearer ${tokenContext._token}` }
          }
        )
        setDroplets(response.data.droplets)
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
    if (tokenContext._token !== null) {
      getDroplets()
    }
  }, [tokenContext._token])

  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading>Droplets</Heading>
      {!droplets ? (
        <Flex justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        droplets.map((droplet) => (
          <Flex
            key={droplet.id}
            alignItems="center"
            marginTop={2}
            cursor={handleSelectDroplet ? 'pointer' : 'default'}
            onClick={() =>
              handleSelectDroplet ? handleSelectDroplet(droplet) : null
            }
          >
            <Heading size="md" marginRight={2}>
              {droplet.name}
            </Heading>
            <Lamp status={droplet.status} />
          </Flex>
        ))
      )}
    </Flex>
  )
}

export default DropletList
