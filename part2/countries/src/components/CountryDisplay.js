import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDisplay = ({country}) =>{
  const api_key = process.env.REACT_APP_API_KEY
  const [ weather, setWeather ] = useState({})

  useEffect(() => {
      axios
        .get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+country.capital)
        .then(response => {
          setWeather(response.data.current)
        })
    }, [])

  return(
    <>
    <h1>{country.name}</h1>
    capital: {country.capital}<br/>
    population: {country.population}<br/>

    <h1>Languages</h1>
    <ul>
    {country.languages.map(lang =>
      <li key={lang.name} > {lang.name}</li>
    )}
    </ul>

    <img src={country.flag} width="200px"/>
    <h1>Weather in {country.capital}</h1>
    temperature: {weather.temperature}<br/>
    <img src={weather.weather_icons} width="200px"/><br/>
    wind: {weather.wind_speed} mph direction {weather.wind_dir}
    </>
  )
}

export default CountryDisplay
