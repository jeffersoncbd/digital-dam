import React, { useState, useContext } from 'react'
import { Flex, Input, Button } from '@chakra-ui/core'

import { DigitalOceanToken } from '../contexts/DigitalOceanToken'

const TokenForm: React.FC = () => {
  const [token, setToken] = useState('')

  const tokenContext = useContext(DigitalOceanToken)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    tokenContext.saveToken(token)
    setToken('')
  }

  return tokenContext._token ? (
    <Button
      marginTop={5}
      onClick={tokenContext.deleteToken}
      textTransform="uppercase"
      backgroundColor="red.500"
      color="white"
      _hover={{ backgroundColor: 'red.600' }}
    >
      Excluir token
    </Button>
  ) : (
    <Flex
      marginTop={5}
      as="form"
      width="full"
      alignItems="center"
      onSubmit={handleSubmit}
    >
      <Input
        borderRadius="0.25rem 0 0 0.25rem"
        type="password"
        name="token"
        value={token}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setToken(event.target.value)
        }
        placeholder="Cole aqui seu token da DigitalOcean"
      />
      <Button borderRadius="0 0.25rem 0.25rem 0" type="submit">
        OK
      </Button>
    </Flex>
  )
}

export default TokenForm
