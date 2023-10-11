import './App.css'
import { Navbar } from './components/Navbar.jsx'
import { CurrentWeather } from './components/CurrentWeather.jsx'
import { useContext, useEffect, useState } from 'react'
import { CityContext } from './context/City'
import { HourlyWeather } from './components/HourlyWeather.jsx'
import { DailyWeather } from './components/DailyWeather'

function App () {
  const { cityName, handleReset } = useContext(CityContext)
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [tab, setTab] = useState(0)

  useEffect(() => {
    if (cityName) {
      fetch(`http://api.weatherapi.com/v1/current.json?key=29c1986c4b4549d7b3502419231010&q=${cityName}&aqi=no`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok')
          }
          return res.json()
        })
        .then((data) => {
          setWeather(data)
          setError(null)
        })
        .catch((err) => {
          console.error(err)
          setError('Error fetching weather data')
        })
    }
  }, [cityName])

  const time = weather ? weather.location.localtime.split(' ')[1] : ''

  const setWallpaper = (time) => {
    const hours = time.split(':')[0]

    if (hours >= 6 && hours < 12) {
      return './amanecer.jpg'
    } else if (hours >= 12 && hours < 18) {
      return './dia.jpg'
    } else if ((hours >= 20 && hours <= 23) || (hours >= 0 && hours < 6)) {
      return './noche.png'
    } else if (hours >= 18 && hours < 20) {
      return './anochecer.png'
    }
  }

  const styles = {
    height: '100vh',
    backgroundImage: `url(${setWallpaper(time)})`,
    backgroundSize: 'cover',
    backgroundPositionX: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    overflowY: 'hidden'
  }

  return (
    <main
      onClick={handleReset} style={styles}
    >
      <Navbar />
      <div className='container'>
        <div className='tabs'>
          <p onClick={() => setTab(0)}>Current</p>
          <p onClick={() => setTab(1)}>Hourly</p>
          <p onClick={() => setTab(2)}>Daily</p>
        </div>
        <div className='section-container'>
          {
          tab === 0 &&
            <section>
              {weather && <CurrentWeather error={error} weather={weather} />}
            </section>
          }
          {
            tab === 1 &&
              <section>
                {weather && <HourlyWeather time={time} />}
              </section>
          }
          {
            tab === 2 &&
              <section>
                {weather && <DailyWeather />}
              </section>
          }
        </div>
      </div>
    </main>
  )
}

export default App
