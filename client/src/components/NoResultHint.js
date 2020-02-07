import React from 'react'
import { SEARCH_RESULT_TYPE } from '../constants/index'

const NoResultHint = ({ displayMode }) => {
  const getText = mode => {
    switch (mode) {
      case SEARCH_RESULT_TYPE.NO_RESULT:
        return 'Nothing Found.'
      case SEARCH_RESULT_TYPE.NO_KEYWORD:
        return 'Please Enter Something to Search.'
      default:
        return 'Please Enter Something to Search.'
    }
  }

  return (
    <div className="no-result-hint">
      {getText(displayMode)}
    </div>
  )
}

export default NoResultHint
