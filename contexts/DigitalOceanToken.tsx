import React, { useState, createContext, useEffect } from 'react'

interface DigitalOceanContext {
  _token: string | null
  saveToken: (token: string) => void
  deleteToken: () => void
}

export const DigitalOceanToken = createContext<null | DigitalOceanContext>(null)

const DigitalOceanTokenProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    if (token === null) {
      const storedToken = localStorage.getItem('token')
      setToken(storedToken)
    }
  }, [])

  function deleteToken() {
    localStorage.removeItem('token')
    setToken(null)
  }

  function saveToken(token: string) {
    localStorage.setItem('token', token)
    setToken(token)
  }

  return (
    <DigitalOceanToken.Provider
      value={{ _token: token, deleteToken, saveToken }}
    >
      {children}
    </DigitalOceanToken.Provider>
  )
}

export default DigitalOceanTokenProvider
