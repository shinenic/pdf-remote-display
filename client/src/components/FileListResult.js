import React from 'react'
import DoubleTap from './common/doubleTap'

// const Row = styled.div`
//   display:grid;
//   width:calc(100% - 2rem);
//   color:${props => props.theme.text[1]};
//   font-size:1.2rem;
//   font-weight:bold;
//   line-height:1.6rem;
//   margin:2rem 1rem 3rem 1rem;
//   grid-template-columns:0.65fr 0.35fr;
//   grid-template-areas:"fileName fileFolder";
//   opacity:0;
//   animation: ${FadeIn} 0.8s 1 both ;
// `

// const GridCenter = styled.div`
//   display:grid;
//   align-items:center;
//   justify-content:center;
//   padding:0;
//   width:100%;
//   user-select: none;
//   overflow:hidden;
//   cursor: pointer;
// `

// const FileName = styled(GridCenter)`
//   justify-content:start;
//   grid-area:fileName;
// `

// const FileFolder = styled(GridCenter)`
//   justify-content:start;
//   grid-area:fileFolder;
// `

const FileListResult = ({ fileName, locatedFolder, index }) => {

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
