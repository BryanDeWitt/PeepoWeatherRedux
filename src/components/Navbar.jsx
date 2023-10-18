import { useState, useCallback, useContext, useEffect } from 'react'
import { MagnifyingGlass, Cloud } from './Icons.jsx'
import './Navbar.css'
import debounce from 'just-debounce-it'
import { CityContext } from '../context/CityContext.jsx'
import { CitySuggestion } from './CitySuggestion.jsx'

export function Navbar () {
  const { setCityName, setCities, cities } = useContext(CityContext)
  const [submit, setSubmit] = useState(false)
  const debounceSearch = useCallback(debounce((e) => handleChange(e), 250))

  const handleChange = (e) => {
    const cities = []
    if (e.target.value.length > 2) {
      fetch(`https://api.weatherapi.com/v1/search.json?key=29c1986c4b4549d7b3502419231010&q=${e.target.value}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            data.forEach(city => {
              cities.push(city)
            })
          }
        }).then(() => {
          setCities(cities)
        })
        .catch(error => console.log(error))
    }
  }

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  useEffect(() => {
    if (submit) {
      const form = document.querySelector('form')
      form.reset()
      setSubmit(false)
    }
  }, [submit])

  return (
    <nav>
      <h1><Cloud />Peepo Weather</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        setCityName(capitalize(e.target.cityName.value))
        setSubmit(true)
      }}
      >
        <label>Find your city: <input name='cityName' type='text' placeholder='Minas... , Tokyo...' onChange={debounceSearch} />
          <button type='submit'>
            <MagnifyingGlass />
          </button>
          {
        cities.length > 0 &&
          <CitySuggestion setSubmit={setSubmit} />
        }
        </label>
      </form>
    </nav>
  )
}
