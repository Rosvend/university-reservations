import React from 'react'
import SpaceList from './components/SpaceList'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>University Reservation System</h1>
        <p>Book university spaces easily and efficiently</p>
      </header>
      
      <main className="app-main">
        <SpaceList />
      </main>
    </div>
  )
}

export default App