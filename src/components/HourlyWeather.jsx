import uuid from 'react-uuid'
import './HourlyWeather.css'
import { useHourlyWeather } from '../hooks/useHourlyWeather.jsx'

export function HourlyWeather ({ time }) {
  const { hours } = useHourlyWeather({ time })
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
