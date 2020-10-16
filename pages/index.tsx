import React, { useContext, useState } from 'react'
import { Flex, Heading, Input, Button } from '@chakra-ui/core'
import { DigitalOceanToken } from '../contexts/DigitalOceanToken'

const Home: React.FC = () => {
  const [form, setForm] = useState({ token: '' })

  const tokenContext = useContext(DigitalOceanToken)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    tokenContext.saveToken(form.token)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

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
      {tokenContext._token ? (
        <Button marginTop={5} onClick={tokenContext.deleteToken}>
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
            name="token"
            value={form.token}
            onChange={handleInputChange}
            placeholder="Cole aqui seu token da DigitalOcean"
          />
          <Button borderRadius="0 0.25rem 0.25rem 0" type="submit">
            OK
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export default Home
