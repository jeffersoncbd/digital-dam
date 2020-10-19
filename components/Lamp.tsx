import React from 'react'
import { Box } from '@chakra-ui/core'

const colors = {
  active: 'green.500',
  off: 'gray.400'
}

interface LampProperties {
  status: string
}

const Lamp: React.FC<LampProperties> = ({ status }) => (
  <Box
    borderRadius="50%"
    backgroundColor={colors[status]}
    height={5}
    width={5}
  />
)

export default Lamp
