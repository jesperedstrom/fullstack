import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const Filter = ({searchText, onChange}) => (
  <form>
    <div>
      find countries <input value={searchText} onChange={onChange}/>
    </div>
  </form>
)

const CountriesList = ({countries, onShow}) => {

    if (countries.length > 10) {
      return(
        <div>Too many matches, specify another filter</div>
      )
    } else if (countries.length === 0) {
      return (
        <div>No matching country found</div>
      )
    } else {
      return(
      countries.map(country => <div key={country.cca3}>{country.name.common} <ShowButton onClick={()=>onShow(country)}/></div>)
      )
    }
}

const ShowButton = ({onClick}) => <button onClick={onClick}>show</button>

const ShowSingleCountry = ({country}) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        Capital {country.capital.join(', ')}<br/>
        Area {country.area}
      </p>

      <h2>Languages</h2>

      <ul>
        {Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)}
      </ul>
      
      <img 
        src={country.flags.png}
        alt={country.flags.alt}
      />

    </div>
  )
}

const Weather =({weather, country}) => {

  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>

      Temperature {weather.temp} Celsius<br/>

      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      /><br/>

      Wind {weather.wind_speed} m/s

    </div>
  )
}

function App() {
  const [searchText, setSearchText] = useState('')
  const [countryData, setCountryData] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  // Get all data
  useEffect(() => {
    axios
    .get(baseUrl)
    .then(response => {
      setCountryData(response.data)
      setFilteredCountries(response.data)
    })
  }, [])

  // Get weather data
  useEffect(() => {
    if (country) {
      console.log(country)

      const time = Math.floor(Date.now()/1000)
      const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&dt=${time}&appid=${api_key}`

      axios
      .get(weatherUrl)
      .then(response => {
        setWeather(response.data.data[0])
        console.log(response.data.data[0])
      })
    }
  }, [country])

  const handleSearchText = (event) => {
    setSearchText(event.target.value)

    // Filter country list
    const countries_filt = countryData.filter((country) => country.name.common.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1)
    setFilteredCountries(countries_filt)

    if (countries_filt.length === 1) {
      // console.log(countries_filt[0].name.common)
      setCountry(countries_filt[0])
    } else {
      setCountry(null)
    }
  }

  const onShow = (country) => {
    setFilteredCountries([country])
    setCountry(country)
  }

  return (
    
    <div>
      <Filter searchText={searchText} onChange={handleSearchText}/>

      {(filteredCountries.length === 1) ? (
        <div>
          <ShowSingleCountry country={filteredCountries[0]}/>
          {weather ? <Weather weather={weather} country={country}/> : 'Weather not retrieved'}
        </div>
        ) : (
        <div>
          <CountriesList countries={filteredCountries} onShow={onShow}/>
        </div>
      )}
      
    </div>

    
  )
}

export default App
