import React, { useState, useEffect, useContext } from 'react'
import { Button, IconButton, Flex, useToast, Spinner } from '@chakra-ui/core'
import DropletList from '../droplet/List'
import ShowDroplet from '../droplet/Show'
import Axios from 'axios'
import { DigitalOceanToken } from '../../contexts/DigitalOceanToken'
import { DropletEntity } from '../../entities/Droplet'

const SwitchAutomation: React.FC = () => {
  const toast = useToast()
  const tokenContext = useContext(DigitalOceanToken)

  const [dropletId, setDropletId] = useState<number>()
  const [droplet, setDroplet] = useState<DropletEntity>()
  const [showDroplets, setShowDroplets] = useState(false)
  const [startWork, setStartWork] = useState<string | null>(null)
  const [stopWork, setStopWork] = useState(false)
  const [update, setUpdate] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function sendAction(data: any) {
    await Axios.post(
      `https://api.digitalocean.com/v2/droplets/${dropletId}/actions`,
      data,
      {
        headers: { Authorization: `Bearer ${tokenContext._token}` }
      }
    )
  }

  function toastDroplet(title: string, status: 'success' | 'info') {
    toast({
      title,
      duration: 3000,
      isClosable: true,
      status
    })
  }

  useEffect(() => {
    async function refreshDroplet() {
      try {
        const response = await Axios.get<{ droplet: DropletEntity }>(
          `https://api.digitalocean.com/v2/droplets/${dropletId}`,
          {
            headers: { Authorization: `Bearer ${tokenContext._token}` }
          }
        )
        console.log(response.data.droplet.status)
        const newData = response.data.droplet
        if (droplet === undefined) {
          setDroplet(response.data.droplet)
          return
        }
        if (
          newData.status !== droplet.status ||
          newData.size_slug !== droplet.size_slug
        ) {
          setDroplet(response.data.droplet)
        }
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
    if (dropletId) {
      refreshDroplet()
    }
  }, [update])

  useEffect(() => {
    if (dropletId) {
      setInterval(() => {
        setUpdate(!update)
      }, 3000)
    }
  }, [dropletId])

  useEffect(() => {
    if (startWork) {
      if (droplet.status === 'active' && droplet.size_slug !== startWork) {
        sendAction({ type: 'power_off' })
        toastDroplet('Desligando droplet', 'info')
      }
      if (droplet.status === 'off' && droplet.size_slug !== startWork) {
        sendAction({
          type: 'resize',
          disk: false,
          size: startWork
        })
        toastDroplet('Redimensionando...', 'info')
      }
      if (droplet.status === 'off' && droplet.size_slug === startWork) {
        sendAction({ type: 'power_on' })
        toastDroplet('Ligando droplet', 'info')
      }
      if (droplet.status === 'active' && droplet.size_slug === startWork) {
        setStartWork(null)
        toastDroplet('Droplet pronto para uso', 'success')
      }
    }
  }, [droplet, startWork])

  useEffect(() => {
    if (stopWork) {
      if (droplet.status === 'active' && droplet.size_slug !== 's-1vcpu-1gb') {
        sendAction({ type: 'power_off' })
        toastDroplet('Desligando droplet', 'info')
      }
      if (droplet.status === 'off' && droplet.size_slug !== 's-1vcpu-1gb') {
        sendAction({
          type: 'resize',
          disk: false,
          size: 's-1vcpu-1gb'
        })
        toastDroplet('Redimensionando...', 'info')
      }
      if (droplet.status === 'off' && droplet.size_slug === 's-1vcpu-1gb') {
        setStopWork(false)
        toastDroplet('Droplet redimensionado', 'success')
      }
    }
  }, [droplet, stopWork])

  function handleButtonClick() {
    if (droplet.size_slug === 's-1vcpu-1gb' && !startWork && !stopWork) {
      setStartWork('s-2vcpu-4gb')
    }
    if (droplet.size_slug !== 's-1vcpu-1gb' && !startWork && !stopWork) {
      setStopWork(true)
    }
  }

  if (showDroplets && dropletId === undefined) {
    return (
      <Flex flexDirection="column">
        <DropletList
          handleSelectDroplet={(dropletId: number) => setDropletId(dropletId)}
        />
        <IconButton
          marginTop={4}
          aria-label="Cancel droplet selection"
          icon="close"
          variantColor="red"
          alignSelf="center"
          onClick={() => setShowDroplets(false)}
        />
      </Flex>
    )
  }

  if (dropletId === undefined) {
    return (
      <Button textTransform="uppercase" onClick={() => setShowDroplets(true)}>
        Selecionar droplet
      </Button>
    )
  }

  if (droplet === undefined) {
    return (
      <Flex justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    )
  }

  return (
    <>
      <ShowDroplet droplet={droplet} />
      <Button
        isLoading={startWork !== null || stopWork}
        textTransform="uppercase"
        marginTop={5}
        size="lg"
        width="full"
        onClick={handleButtonClick}
      >
        {droplet.size_slug === 's-1vcpu-1gb' ? 'start work' : 'stop work'}
      </Button>
    </>
  )
}

export default SwitchAutomation
