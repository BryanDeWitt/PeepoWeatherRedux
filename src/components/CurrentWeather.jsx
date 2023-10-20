import { useContext } from 'react'
import { CityContext } from '../context/CityContext'
import './CurrentWeather.css'

export function CurrentWeather ({ weather, error, loading }) {
  const { cityName } = useContext(CityContext)
  if (error) {
    return <h2>{error}</h2>
  }

  if (!cityName) {
    return <h2>City not found</h2>
  }

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (weather) {
    return (
      <div className='current-weather'>
        <h2>
          {weather.location.name}, {weather.location.country}
          <br />
          {weather.location.localtime.split(' ')[1]}, {weather.current.temp_c}°C
        </h2>
        <div className='current-weather-condition'>
          <h3>
            {weather.current.condition.text}
          </h3>
          <img src={weather.current.condition.icon} width={100} height={100} alt='' />
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
