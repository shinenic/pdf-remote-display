import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #CCC;

  & canvas {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`

const Home = () => {
  return (
    <MainDiv>
      <Link to="/">Home</Link>
      <Link to="/display">Display</Link>
      <Link to="/search">Search</Link>
    </MainDiv>
  )
}

export default Home
