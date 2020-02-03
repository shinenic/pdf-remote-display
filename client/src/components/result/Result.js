import React from 'react'
import { SEARCH_MODE_TYPE } from '../../constants/index'

import FileListResult from './FileListResult'
import SongListResult from './SongListResult'

const Result = ({
  result,
  currentCount,
  searchMode,
  selectedIndex,
  sendFileIndex,
  findArtist,
  isPDFLoadSuccess
}) => {
  const view = result.slice(0, currentCount).map((data, index) => {
    switch (searchMode) {
      case SEARCH_MODE_TYPE.FILE_LIST:
        return (
          <FileListResult
            key={index}
            data={data}
            selected={data.index === selectedIndex}
            isPDFLoadSuccess={isPDFLoadSuccess}
            sendFileIndex={index => sendFileIndex(index)} />
        )
      case SEARCH_MODE_TYPE.SONG_LIST:
        return (
          <SongListResult
            key={index}
            data={data}
            findArtist={() => findArtist(data[1])} />
        )
      default:
        return null
    }
  })

  return view
}

export default Result
