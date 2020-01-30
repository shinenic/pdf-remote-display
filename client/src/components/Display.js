import React, { Component } from 'react'
import { pdfjs } from 'react-pdf'
import { Document, Page } from 'react-pdf'
import styled from 'styled-components'
import {
  getViewport,
  RENDER_SIZE_BY_HEIGHT,
  RENDER_SIZE_BY_WIDTH
} from '../utils/base'

import { pdfjsWorkerSrc, samepleFile } from '../config'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerSrc(pdfjs.version)

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

class App extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    pdfDisplayMode: RENDER_SIZE_BY_HEIGHT // RENDER_SIZE_BY_WIDTH
  }

  handleDocumentLoadSuccess (pdf) {
    this.setState({ numPages: pdf.numPages })
  }

  handleOnClick() {
    const { numPages, pageNumber } = this.state
    if(numPages === 1) return null
    this.setState({
      pageNumber: numPages === pageNumber ? 1 : pageNumber + 1
    })
  }

  render() {
    const { pageNumber, numPages } = this.state
    const viewport = getViewport()
    console.log(viewport.height, viewport.width)

    return (
      <MainDiv onClick={() => this.handleOnClick()}>
        {/* onClick={() => this.handleOnClick()} */}
        <Document
          file={samepleFile}
          className='pdf-container'
          onLoadSuccess={pdf => this.handleDocumentLoadSuccess(pdf)}>
          <Page 
            pageNumber={pageNumber} 
            height={viewport.height}
            renderAnnotationLayer={false}
            renderTextLayer={false}/>
        </Document>
        {/* <p>Page {pageNumber} of {numPages}</p> */}
      </MainDiv>
    )
  }
}

export default App