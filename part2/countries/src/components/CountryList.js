import React from 'react'



const CountryList = ({entries,showhandler}) =>(
  <>
  {entries.map(entry =>
    <div key={entry.name}>
      {entry.name}<button onClick={() => showhandler(entry)}>show</button>
    </div>
  )}
  </>
)

export default CountryList
