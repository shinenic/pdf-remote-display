import React from 'react'
import classNames from 'classnames'
import DoubleTap from '../common/doubleTap'

const FileListResult = ({
  data: { name: fileName, locatedFolder, index },
  sendFileIndex,
  selected,
  isPDFLoadSuccess
}) => {

  const getYTSearchKeywork = fileName => {
    const strWithoutBlank = fileName.replace(/\s/g, '')
    const strWithoutPage = strWithoutBlank.replace(/(\(.+\))/g, '')
    return strWithoutPage.split(/-|_/g).join(' ')
  }

  const connectToYoutube = () => {
    const keyword = getYTSearchKeywork(fileName)
    const check = window.confirm(`連結至Youtube搜尋 "${keyword}" `)
    if (check) {
      window.open('https://www.youtube.com/results?search_query='
        + `${keyword}`, '_blank').focus()
    }
  }

  const rowClassNames = classNames( 'row', 'row--file-list', 
                                  { 'row--on-load': selected, },
                                  { 'row--loaded': isPDFLoadSuccess && selected })
  return (
    <div className={rowClassNames}>
      <DoubleTap
        className={'column-fileName'}
        content={fileName}
        doubleTapEvent={() => connectToYoutube()} />
      <DoubleTap
        className={'column-fileFolder'}
        content={locatedFolder}
        doubleTapEvent={() => sendFileIndex(index)} />
    </div>
  )
}

export default FileListResult
