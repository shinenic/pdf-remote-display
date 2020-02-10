import React from 'react'

const Spinner = ({ height = 48, width = 48 }) => {
  return (
    <div className="loading-spinner" style={{ height, width }} />
  )
}

export default Spinner