import { useState, useEffect } from "react";
import axios from "axios";

const CountryInfo = (props) => {
  const c = props.country
  const l = Object.values(c.languages)

  return (
    <div>
      <h1>
        {c.name.common}
      </h1>
      <div>capital {c.capital}</div>
      <div>area {c.area}</div>
      <h4>languages:</h4>
      <ul>
        {l.map(x => <li key={x}>{x}</li>)}
      </ul>
      <img src={c.flags.svg} width="300" />
    </div>)
}

const CountryList = (props) => {
  if (props.selectedCountry.length != 0) {
    return <CountryInfo country={props.selectedCountry}></CountryInfo>
  }
  else if (props.countryList.length === 1) {
    const c = props.countryList[0]
    return (
      <CountryInfo country={c}></CountryInfo>
    )
  } else if (props.countryList.length <= 10) {
    return (
      <div>
        {props.countryList.map(c =>
          <div key={c.name.common}>
            <label>{c.name.common}</label>
            <button onClick={() => props.selectCountry(c)}>show</button>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, selectCountry] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  })

  const handleValueChange = (event) => {
    setFilter(event.target.value)
    selectCountry([])
  }

  const countriesToShow =
    countries.filter(countries => countries.name.common.toLowerCase().includes(filter))

  return (
    <div>
      <label>
        Find countries
        <input onChange={handleValueChange} />
      </label>
      <CountryList countryList={countriesToShow} selectCountry={selectCountry}
        selectedCountry={selectedCountry} />
    </div>
  );
}

export default App;
