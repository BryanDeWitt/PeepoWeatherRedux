import { useState, useContext, useEffect } from 'react'
import { CityContext } from '../context/City'
import uuid from 'react-uuid'
import './HourlyWeather.css'

export function HourlyWeather ({ time }) {
  const { cityName } = useContext(CityContext)
  const [hours, setHours] = useState([])
  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=29c1986c4b4549d7b3502419231010&q=${cityName}&days=3&aqi=no&alerts=no`)
      .then((res) => res.json())
      .then((data) => {
        const restHours = data.forecast.forecastday[0].hour.filter((hour) => {
          return parseInt(hour.time.split(' ')[1].split(':')[0]) > parseInt(time)
        })
        setHours(restHours)
      })
      .catch(err => console.log(err))
  }, [cityName, time])
  return (
    <ul className='hourly-weather-list'>
      {
          hours.map((hour) => {
            return (
              <li key={uuid()}>
                <div>
                  {hour.time.split(' ')[1]}
                  <img src={hour.condition.icon} alt={hour.condition.text} />
                </div>
                <div>
                  <p>{hour.temp_c}°C</p>
                  <p>{hour.condition.text}</p>
                </div>
              </li>
            )
          })
        }
    </ul>
  )
}
