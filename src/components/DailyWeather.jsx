import uuid from 'react-uuid'
import './DailyWeather.css'
import { useDailyWeather } from '../hooks/useDailyWeather.jsx'
import { CityContext } from '../context/CityContext.jsx'
import { useContext } from 'react'

export function DailyWeather ({ error }) {
  const { days, dayName, dailyLoad } = useDailyWeather()
  const { cityName } = useContext(CityContext)
  if (error) {
    return <h2>{error}</h2>
  }

  if (!cityName) {
    return (
      <div className='daily-weather-list'>
        <h2>Please select a city</h2>
      </div>
    )
  }

  if (dailyLoad) {
    return (
      <div className='daily-weather-list'>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <ul className='daily-weather-list'>
      {
          days.map((day) => {
            return (
              <li className='daily-item' key={uuid()}>
                <div>
                  <h2>{day === days[0] ? 'Today' : day === days[1] ? 'Tomorrow' : dayName}</h2>
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
