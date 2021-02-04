import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import CountryDisplay from './components/CountryDisplay'



const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')

  useEffect(() => {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountries(response.data)
        })
    }, [])



  const filteredCountries = search===''? [...countries]: countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
  const showhandler=(entry)=>{
    setSearch(entry.name)
  }

  return (
    <div>
      <input value={search} onChange={(event)=>setSearch(event.target.value)}/>
      {
        filteredCountries.length===1? (
        <CountryDisplay country={filteredCountries[0]}/>
      ) : (
        <CountryList showhandler={showhandler} entries={filteredCountries}/>
      )}

    </div>
  )
}

export default App
