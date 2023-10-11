import { useContext, useEffect, useState } from 'react'
import { CityContext } from '../context/City'
import uuid from 'react-uuid'
import './DailyWeather.css'
export function DailyWeather () {
  const { cityName } = useContext(CityContext)
  const [days, setDays] = useState([])
  useEffect(() => {
    const days = []
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=29c1986c4b4549d7b3502419231010&q=${cityName}&days=3&aqi=no&alerts=no`)
      .then((res) => res.json())
      .then((data) => data.forecast.forecastday.forEach((day) => {
        days.push(day.day)
        setDays(days)
      })).catch(err => console.log(err))
  }, [cityName])

  return (
    <ul className='daily-weather-list'>
      {
          days.map((day) => {
            return (
              <li className='daily-item' key={uuid()}>
                <div>
                  <h2>{day === days[0] ? 'Today' : day === days[1] ? 'Tomorrow' : 'Day after tomorrow'}</h2>
                  <img src={day.condition.icon} alt={day.condition.text} />
                  <div className='temps'>
                    <p>Max temp: {day.maxtemp_c}°C</p>
                    <p>Min temp: {day.mintemp_c}°C</p>
                    <p>{day.condition.text}</p>
                  </div>
                </div>
              </li>
            )
          }
          )
        }
    </ul>
  )
}
