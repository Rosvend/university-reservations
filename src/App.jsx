import React from 'react'
import SpaceList from './components/SpaceList'
import ReservationForm from './components/ReservationForm'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>University Reservation System</h1>
        <p>Book university spaces easily and efficiently</p>
      </header>
      
      <main className="app-main">
        <section className="app-section">
          <ReservationForm />
        </section>
        
        <section className="app-section">
          <SpaceList />
        </section>
      </main>
    </div>
  )
}

export default App