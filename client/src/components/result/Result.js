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
        const [pdfIndex, fileName, locatedFolder] = data
        return (
          <FileListResult
            key={index}
            index={pdfIndex}
            fileName={fileName}
            locatedFolder={locatedFolder}
            selected={pdfIndex === selectedIndex}
            isPDFLoadSuccess={isPDFLoadSuccess}
            sendFileIndex={index => sendFileIndex(index)} />
        )
      case SEARCH_MODE_TYPE.SONG_LIST:
        const [title, artist, volume, page] = data
        return (
          <SongListResult
            key={index}
            title={title}
            artist={artist}
            volume={volume}
            page={page}
            findArtist={() => findArtist(artist)} />
        )
      default:
        return null
    }
  })

  return view
}

export default Result
