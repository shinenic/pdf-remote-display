import React from 'react'
import Arrow from '../../img/page-arrow.svg'

const PageCtrl = ({ goNextPage, goPrevPage }) => {
  return (
    <div className="page-ctrl">
      <div onClick={goPrevPage}>
        <img
          src={Arrow}
          alt="icon"/>
      </div>
      <div />
      <div onClick={goNextPage}>
        <img
          src={Arrow}
          alt="icon"/>
      </div>
    </div>
  )
}

export default PageCtrl