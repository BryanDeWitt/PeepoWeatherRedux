import { createContext, useState } from 'react'

export const CityContext = createContext()

export const CityProvider = ({ children }) => {
  const [cityName, setCityName] = useState('Tokyo')
  const [cities, setCities] = useState([])

  const handleReset = () => {
    setCities([])
  }
  return (
    <CityContext.Provider value={{ cityName, setCityName, handleReset, cities, setCities }}>
      {children}
    </CityContext.Provider>
  )
}
