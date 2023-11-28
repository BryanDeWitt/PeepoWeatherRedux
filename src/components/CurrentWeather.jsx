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
          <div className='details-cards'>
            <img src='./feelsLike.png' alt='Feels like Icon' />
            <p>Feels like: {weather.current.feelslike_c}°C</p>
          </div>
          <div className='details-cards'>
            <img src='./wind.png' alt='Wind velocity icon' />
            <p>Wind: {weather.current.wind_kph}km/h</p>
          </div>
          <div className='details-cards'>
            <img src='./humidity.png' alt='Humidity icon' />
            <p>Humidity: {weather.current.humidity}%</p>
          </div>
          <div className='details-cards'>
            <img src='./visibility.png' alt='Visibility icon' />
            <p>Visibility: {weather.current.vis_km}km</p>
          </div>
        </div>
      </div>
    )
  }
}
