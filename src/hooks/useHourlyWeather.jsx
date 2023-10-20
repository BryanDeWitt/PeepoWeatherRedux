import { useState, useContext, useEffect } from 'react'
import { CityContext } from '../context/CityContext'

export function useHourlyWeather ({ time }) {
  const { cityName } = useContext(CityContext)
  const [hourlyLoad, setHourlyLoad] = useState(false)
  const [hours, setHours] = useState([])
  useEffect(() => {
    setHourlyLoad(true)
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=29c1986c4b4549d7b3502419231010&q=${cityName}&days=3&aqi=no&alerts=no`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then((data) => {
        if (parseInt(data.location.localtime.split(' ')[1].split(':')[0]) === 23) {
          const restHours = data.forecast.forecastday[1].hour
          setHours(restHours)
        } else {
          const restHours = data.forecast.forecastday[0].hour.filter((hour) => {
            return parseInt(hour.time.split(' ')[1].split(':')[0]) > parseInt(time)
          })
          setHours(restHours)
          setHourlyLoad(false)
        }
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
