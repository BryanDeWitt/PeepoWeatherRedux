import './App.css'
import { Navbar } from './components/Navbar.jsx'
import { CurrentWeather } from './components/CurrentWeather.jsx'
import { useContext, useState } from 'react'
import { CityContext } from './context/CityContext'
import { HourlyWeather } from './components/HourlyWeather.jsx'
import { DailyWeather } from './components/DailyWeather'
import { useCurrentWeather } from './hooks/useCurrentWeather.jsx'
import { setWallpaper } from './utils/functions.js'

function App () {
  const { handleReset } = useContext(CityContext)
  const { weather, error, loading } = useCurrentWeather()

  const [tab, setTab] = useState(0)

  const time = weather ? weather.location.localtime.split(' ')[1] : ''

  const styles = {
    height: '100vh',
    backgroundImage: `url(${setWallpaper(time)})`,
    backgroundSize: 'cover',
    backgroundPositionX: '50%',
    backgroundRepeat: 'no-repeat',
    overflowX: 'hidden',
    backgroundAttachment: 'fixed',
    overflowY: 'scroll'
  }

  const tabSelectedStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    transition: 'all 0.5s'
  }

  return (
    <main
      onClick={handleReset} style={styles}
    >
      <Navbar />
      <div className='container'>
        <div className='tabs'>
          <p
            style={tab === 0 ? tabSelectedStyle : null}
            onClick={() => setTab(0)}
          >
            Current
          </p>
          <p
            style={tab === 1 ? tabSelectedStyle : null}
            onClick={() => setTab(1)}
          >
            Hourly
          </p>
          <p
            style={tab === 2 ? tabSelectedStyle : null}
            onClick={() => setTab(2)}
          >
            Daily
          </p>
        </div>
        <div className='section-container'>
          {
          tab === 0 &&
            <section>
              <CurrentWeather error={error} weather={weather} loading={loading} />
            </section>
          }
          {
            tab === 1 &&
              <section>
                <HourlyWeather error={error} time={time} />
              </section>
          }
          {
            tab === 2 &&
              <section>
                <DailyWeather error={error} />
              </section>
          }
        </div>
      </div>
      <footer>
        Powered by
        <a href='https://www.weatherapi.com/' title='Free Weather API' target='_blank' rel='noreferrer'>
          WeatherAPI.com
        </a>
      </footer>
    </main>
  )
}

export default App
