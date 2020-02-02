import React from 'react'
import { Link } from 'react-router-dom'
import { SEARCH_MODE_TYPE } from '../constants/index'


const Home = () => {
  return (
    <div className="home">
      <Link to="/">Home</Link>
      <Link to="/viewer">Viewer</Link>
      <Link to={{pathname: '/filelist', searchMode: SEARCH_MODE_TYPE.FILE_LIST }}>File List</Link>
      <Link to={{pathname: '/songlist', searchMode: SEARCH_MODE_TYPE.SONG_LIST }}>Song List</Link>
    </div>
  )
}

export default Home
