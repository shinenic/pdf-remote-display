import React from 'react'

import Spinner from '../common/icons/spinner'
import Cross from '../common/icons/cross'
import Info from '../common/icons/info'

const Status = (status) => {
  switch (status) {
    case 'loading':
      return (
        <div className="viewer__pdf-status">
          <Spinner />
          <span className="viewer__pdf-status__description">
            File Loading...
          </span>
        </div>
      )
    case 'noData':
      return (
        <div className="viewer__pdf-status">
          <Info />
          <span className="viewer__pdf-status__description">
            No Data...
          </span>
        </div>
      )
    case 'error':
      return (
        <div className="viewer__pdf-status">
          <Cross />
          <span className="viewer__pdf-status__description">
            Error
          </span>
        </div>
      )
  }
}

export default Status