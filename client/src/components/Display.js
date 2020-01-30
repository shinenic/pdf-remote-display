import React, { Component } from 'react'
import { pdfjs } from 'react-pdf'
import { Document, Page } from 'react-pdf'
import styled from 'styled-components'
import {
  getViewport,
  RENDER_SIZE_BY_HEIGHT,
  // RENDER_SIZE_BY_WIDTH
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

// TODO: Render pdf canvas according to width or height
// TODO: Add float buttun on top side (which can link to home page)

class App extends Component {
  state = {
    pageCount: null,
    pageNumber: 1,
    pdfDisplayMode: RENDER_SIZE_BY_HEIGHT // RENDER_SIZE_BY_WIDTH
  }

  handleDocumentLoadSuccess (pdf) {
    this.setState({ pageCount: pdf.numPages })
  }

  handleOnClick() {
    const { pageCount, pageNumber } = this.state
    if(pageCount === 1) return null
    this.setState({
      pageNumber: pageCount === pageNumber ? 1 : pageNumber + 1
    })
  }

  render() {
    const { pageNumber } = this.state
    const viewport = getViewport()

    return (
      <MainDiv onClick={() => this.handleOnClick()}>
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
      </MainDiv>
    )
  }
}

export default App
