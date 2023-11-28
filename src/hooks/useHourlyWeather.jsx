import { useState, useContext, useEffect } from 'react'
import { CityContext } from '../context/CityContext'
import { apiKey } from '../../config/apiKey'

export function useHourlyWeather ({ time }) {
  const { cityName } = useContext(CityContext)
  const [hourlyLoad, setHourlyLoad] = useState(false)
  const [hours, setHours] = useState([])
  useEffect(() => {
    setHourlyLoad(true)
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3&aqi=no&alerts=no`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then((data) => {
        const twientyFourHours = data.forecast.forecastday[0].hour.slice(parseInt(time.split(':')[0]), 23).concat(data.forecast.forecastday[0].hour.slice(0, parseInt(time.split(':')[0]) + 1))
        setHours(twientyFourHours)
        setHourlyLoad(false)
      })
      .catch(err => {
        setHourlyLoad(false)
        console.log(err)
      })
  }, [cityName, time])
  return {
    hours,
    hourlyLoad
  }
}
