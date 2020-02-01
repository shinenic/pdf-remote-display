import React from 'react'
import DoubleTap from './common/doubleTap'

const FileListResult = ({ data: { name: fileName, locatedFolder, index } }) => {

  const getYTSearchKeywork = fileName => {
    const strWithoutBlank = fileName.replace(/\s/g, '')
    const strWithoutPage = strWithoutBlank.replace(/(\(.+\))/g, '')
    return strWithoutPage.split(/-|_/g).join(' ')
  }

  const connectToYoutube = () => {
    const keyword = getYTSearchKeywork(fileName)
    const check = window.confirm(`連結至Youtube搜尋 "${keyword}" `);
    if (check) {
      window.open('https://www.youtube.com/results?search_query='
        + `${keyword}`, '_blank').focus()
    }
  }

  return (
    <div className="row row--file-list">
      <DoubleTap
        className={'column-fileName'}
        content={fileName}
        doubleTapEvent={() => connectToYoutube()} />
      <DoubleTap
        className={'column-fileFolder'}
        content={locatedFolder}
        doubleTapEvent={() => { return null }} />
    </div>
  )
}

export default FileListResult
