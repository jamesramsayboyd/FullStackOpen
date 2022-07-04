import { useEffect, useState } from 'react'
import axios from 'axios'

const CountryForm = (props) => {
  return (
    <div>
      <form onSubmit={props.findCountry}>
        find countries <input value={props.target} onChange={props.handleTargetChange} />
      </form>
    </div>
  )
}

const DisplayCountries = ({ countryList }) => {
  if (countryList.length === 0) {
    return <div>Country not found</div>
  }
  else if (countryList.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (countryList.length === 1) {
    return <DetailedDisplay country={countryList[0]} />
  }
  else {
    return <DisplaySingle countryList={countryList.map(country => country.name)} />
  }
}

const DisplaySingle = ({ countryList }) => {
  const names = countryList.map((country, i) => 
    <div key={i}>{country.common}</div>
  )
  return names
}

const DetailedDisplay = ({ country }) => {
  // Gets only the values of key/value pairs under country.languages
  // (difficult to work with because keys have different names for each country)
  const languages = Object.values(country.languages)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <p><b>languages:</b></p>
      <ul>
        {
          languages.map((language, i) => (
            <li key={i}>{language}</li>
          ))
        }
      </ul>
      <img src={country.flags.png}
           alt="flag"
           width="200"></img>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [target, setTarget] = useState('')
  const [countryList, setCountryList] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const findCountry = (event) => {
    event.preventDefault()
    let filteredList = countries.filter(country => {
      return country.name.common.toLowerCase().includes(target.toLowerCase())
    })
    setCountryList(filteredList)
  }
  
  const handleTargetChange = (event) => {
    setTarget(event.target.value)
  }

  return ( 
    <div>
      <CountryForm findCountry={findCountry} target={target} handleTargetChange={handleTargetChange} />
      <DisplayCountries countryList={countryList} />
    </div>
  )
}

export default App