import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({searchText, onChange}) => (
  <form>
    <div>
      find countries <input value={searchText} onChange={onChange}/>
    </div>
  </form>
)

const Countries = ({countries, onShow}) => {

    if (countries.length > 10) {
      return(
        <div>Too many matches, specify another filter</div>
      )
    } else if (countries.length === 1) {
      return (
        <ShowSingleCountry country={countries[0]}/>
      )
    } else if (countries.length === 0) {
      return (
        <div>No matching country found</div>
      )
    } else {
      return(
      countries.map(country => <div key={country.cca3}>{country.name.common} <ShowButton onClick={()=>onShow([country])}/></div>)
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

function App() {
  const [searchText, setSearchText] = useState('')
  const [countryData, setCountryData] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

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

  const handleSearchText = (event) => {
    setSearchText(event.target.value)

    // Filter country list
    const countries_filt = countryData.filter((country) => country.name.common.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1)
    setFilteredCountries(countries_filt)
  }

  return (
    
    <div>
      <Filter searchText={searchText} onChange={handleSearchText}/>

      <Countries countries={filteredCountries} onShow={setFilteredCountries}/>
    </div>

    
  )
}

export default App
