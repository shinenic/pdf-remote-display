import React, { Component } from 'react'
import { pdfjs } from 'react-pdf'
import { Document, Page } from 'react-pdf'
import {
  getViewport,
  RENDER_SIZE_BY_HEIGHT,
  RENDER_SIZE_BY_WIDTH
} from '../utils/base'

import { pdfjsWorkerSrc, samepleFile } from '../config'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerSrc(pdfjs.version)

class App extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    pdfDisplayMode: RENDER_SIZE_BY_HEIGHT // RENDER_SIZE_BY_WIDTH
  }

  handleDocumentLoadSuccess (pdf) {
    this.setState({ numPages: pdf.numPages })
    console.log(pdf)
  }

  handleOnClick() {
    const { numPages, pageNumber } = this.state
    this.setState({
      pageNumber: numPages === pageNumber ? pageNumber : pageNumber + 1
    })
  }

  render() {
    const { pageNumber, numPages } = this.state
    const viewport = getViewport()
    console.log(viewport.height, viewport.width)

    return (
      <div>
        {/* onClick={() => this.handleOnClick()} */}
        <Document
          file={samepleFile}
          className='pdf-container'
          onLoadSuccess={pdf => this.handleDocumentLoadSuccess(pdf)}
          // rotate={90}
        >
          <Page 
            pageNumber={pageNumber} 
            height={viewport.height}/>
        </Document>
        {/* <p>Page {pageNumber} of {numPages}</p> */}
      </div>
    )
  }
}

export default App