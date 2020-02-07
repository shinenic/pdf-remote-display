import React from 'react'
import { Link } from 'react-router-dom'
import { SEARCH_MODE_TYPE } from '../constants/index'
import { getUrlWithMergedParams } from '../utils/base'


const Home = () => {
  return (
    <div className="home">
      <Link to="/viewer">Viewer</Link>
      <Link to={{
        pathname: getUrlWithMergedParams('/filelist/'),
        searchMode: SEARCH_MODE_TYPE.FILE_LIST
      }}>File List</Link>
      <Link to={{
        pathname: getUrlWithMergedParams('/songlist/'),
        searchMode: SEARCH_MODE_TYPE.SONG_LIST
      }}>Song List</Link>
    </div>
  )
}

export default Home
