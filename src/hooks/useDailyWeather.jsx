import { useState, useContext, useEffect } from 'react'
import { CityContext } from '../context/CityContext.jsx'

export function useDailyWeather () {
  const { cityName } = useContext(CityContext)
  const [dayName, setDayName] = useState('')
  const [days, setDays] = useState([])
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  useEffect(() => {
    const days = []
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=29c1986c4b4549d7b3502419231010&q=${cityName}&days=3&aqi=no&alerts=no`)
      .then((res) => res.json())
      .then((data) => {
        setDayName(daysOfWeek[new Date(data.forecast.forecastday[2].date).getDay()])
        data.forecast.forecastday.forEach((day) => {
          days.push(day.day)
          setDays(days)
        })
      }
      ).catch(err => console.log(err))
  }, [cityName])
  return {
    dayName,
    days
  }
}
