import React from 'react'
import Header from './components/Header/Header'
import './index.css'
import CardGrid from './components/Cards/CardGrid'
import CountryStats from './components/CountryStats/CountryStats'


const App = () => {

  return (
    <div>
      <Header />
      <CardGrid />
      <CountryStats />
    </div>
  )
}

export default App
