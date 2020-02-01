import React, { Component } from 'react'
import { pdfjs } from 'react-pdf'
import { Document, Page } from 'react-pdf'
import { RENDER_SIZE_BY_HEIGHT, RENDER_SIZE_BY_WIDTH} from '../constants'
import { getViewport } from '../utils/base'

import { pdfjsWorkerSrc, samepleFile } from '../config'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerSrc(pdfjs.version)

// TODO: Render pdf canvas according to width or height
// TODO: Add float buttun on top side (which can link to home page)

class Viewer extends Component {
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
      <div className="viewer" onClick={() => this.handleOnClick()}>
        <Document
          file={samepleFile}
          className="pdf-container"
          onLoadSuccess={pdf => this.handleDocumentLoadSuccess(pdf)}>
          <Page 
            pageNumber={pageNumber} 
            height={viewport.height}
            renderAnnotationLayer={false}
            renderTextLayer={false}/>
        </Document>
      </div>
    )
  }
}

export default Viewer
