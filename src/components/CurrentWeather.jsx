import { useContext } from 'react'
import { CityContext } from '../context/City'
import './CurrentWeather.css'

export function CurrentWeather ({ weather, error }) {
  const { cityName } = useContext(CityContext)
  if (error) {
    return <h2>{error}</h2>
  }

  if (!cityName) {
    return <h2>City not found</h2>
  }

  if (weather) {
    return (
      <div className='current-weather'>
        <h2>
          {weather.location.name}, {weather.location.country}
          <br />
          {weather.location.localtime.split(' ')[1]} <span>{weather.current.temp_c}°C</span>
        </h2>
        <div className='current-weather-condition'>
          <h3>
            {weather.current.condition.text}
          </h3>
          <img src={weather.current.condition.icon} width={50} height={50} alt='' />
        </div>
        <div className='current-weather-details'>
          <p>Feels like: {weather.current.feelslike_c}°C</p>
          <p>Wind: {weather.current.wind_kph}km/h</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Visibility: {weather.current.vis_km}km</p>
        </div>
      </div>
    )
  }
}
