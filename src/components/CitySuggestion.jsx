import { useContext } from 'react'
import { CityContext } from '../context/CityContext'

export function CitySuggestion ({ setSubmit }) {
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
            setSubmit(true)
          }}
          key={city.id}
        >
          {`${city.name} ${city.country}`}
        </li>
      ))}
    </ul>
  )
}
