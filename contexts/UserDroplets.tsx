import React, { createContext, useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import { DigitalOceanToken } from './DigitalOceanToken'
import { useToast } from '@chakra-ui/core'
import { DropletEntity } from '../entities/Droplet'

interface UserDroplets {
  droplets: DropletEntity[] | undefined
}

export const UserDropletContext = createContext<UserDroplets | null>(null)

const UserDropletsProvider: React.FC = ({ children }) => {
  const [droplets, setDroplets] = useState<DropletEntity[] | undefined>()

  const toast = useToast()
  const tokenContext = useContext(DigitalOceanToken)

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
    <UserDropletContext.Provider value={{ droplets }}>
      {children}
    </UserDropletContext.Provider>
  )
}

export default UserDropletsProvider
