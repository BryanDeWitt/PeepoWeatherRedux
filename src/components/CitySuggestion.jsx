import { useContext } from 'react'
import { CityContext } from '../context/City'

export function CitySuggestion () {
  const { setCityName, cities, handleReset } = useContext(CityContext)

  const handleClick = (cityName) => {
    handleReset()
    setCityName(cityName)
  }
  return (
    <ul className='suggestion-list'>
      {cities.map((city) => (
        <li
          onClick={() => {
            handleClick(city.name)
          }}
          key={city.id}
        >
          {`${city.name} ${city.region}`}
        </li>
      ))}
    </ul>
  )
}
