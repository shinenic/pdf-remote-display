import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home">
      <Link to="/">Home</Link>
      <Link to="/viewer">Viewer</Link>
      <Link to="/search">Search</Link>
    </div>
  )
}

export default Home
