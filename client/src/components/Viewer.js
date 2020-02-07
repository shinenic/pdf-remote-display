import React, { Component } from 'react'
import webSocket from 'socket.io-client'
import { Link } from 'react-router-dom'

import { pdfjs } from 'react-pdf'
import { Document, Page } from 'react-pdf'

import { RENDER_SIZE_BY_HEIGHT, RENDER_SIZE_BY_WIDTH, PDF_LOAD_SUCCESS } from '../constants'
import { getViewport, getNowTime } from '../utils/base'
import { getPdfjsWorkerSrc, api } from '../config'
import HomeImg from "../img/home.svg"

const LOCAL_STORAGE_TIMEOUT = 3600000 // One hour
pdfjs.GlobalWorkerOptions.workerSrc = getPdfjsWorkerSrc(pdfjs.version)

class Viewer extends Component {
  state = {
    pageCount: null,
    pageNumber: 1,
    pdfDisplayMode: RENDER_SIZE_BY_HEIGHT,
    ws: null,
    fileUrl: '',
    isConnected: false
  }
  pageRef = null

  componentDidMount() {
    this.initWebSocket()
  }

  initWebSocket() {
    this.setState({ ws: webSocket(api.webSocket) }, () => {
      const { ws } = this.state
      this.initWebSocketActions(ws)
    })
  }

  initWebSocketActions(ws) {
    ws.on('getLatestFileIndex', (index, timeStamp) => {
      if (timeStamp + LOCAL_STORAGE_TIMEOUT > getNowTime()) {
        this.setFileUrl(index)
      }
    })
    ws.on('getPDFFile', res => {
      this.setFileUrl(res)
    })
    ws.on('connect', () => {
      this.setState({ isConnected: !!ws.connected })
    })
    // Get latest file index while App start
    ws.emit('getLatestFileIndex')
  }

  setFileUrl(index) {
    this.setState({ fileUrl: `${api.getPdfFile}?index=${index}`, pageNumber: 1 })
  }

  handleDocumentLoadSuccess(pdf) {
    const { ws } = this.state
    this.setState({ pageCount: pdf.numPages })
    ws.emit('fileLoad', PDF_LOAD_SUCCESS)
  }

  handleRenderSuccess() {
    const { pdfDisplayMode } = this.state
    const viewport = getViewport()
    const canvasWidth = this.pageRef.firstChild.style.width.replace('px', '')
    const canvasHeight = this.pageRef.firstChild.style.height.replace('px', '')
    // Check PDF size and rerender if needed
    if (canvasWidth > viewport.width && pdfDisplayMode === RENDER_SIZE_BY_HEIGHT) {
      this.setState({ pdfDisplayMode: RENDER_SIZE_BY_WIDTH })
    } else if (canvasHeight > viewport.height && pdfDisplayMode === RENDER_SIZE_BY_WIDTH) {
      this.setState({ pdfDisplayMode: RENDER_SIZE_BY_HEIGHT })
    }
  }

  handleOnClick(e) {
    const { pageCount } = this.state
    if (pageCount === 1) return null
    
    const viewport = getViewport()
    if(e.clientX > viewport.width / 2) {
      this.goNextPage()
    } else {
      this.goPrevPage()
    }
  }

  goNextPage() {
    const { pageCount, pageNumber } = this.state
    this.setState({ pageNumber: pageNumber === pageCount ? 1 : pageNumber + 1 })
  }

  goPrevPage() {
    const { pageCount, pageNumber } = this.state
    this.setState({ pageNumber: pageNumber === 1 ? pageCount : pageNumber - 1 })
  }

  render() {
    const { pageNumber, fileUrl, isConnected, pdfDisplayMode } = this.state
    const viewport = getViewport()
    const canvasHeight = pdfDisplayMode === RENDER_SIZE_BY_HEIGHT ? viewport.height : null
    const canvasWidth = pdfDisplayMode === RENDER_SIZE_BY_WIDTH ? viewport.width : null

    return (
      <div className="viewer" onClick={e => this.handleOnClick(e)}>
        <Document
          file={fileUrl}
          className="pdf-container"
          onLoadSuccess={pdf => this.handleDocumentLoadSuccess(pdf)}>
          <Page
            pageNumber={pageNumber}
            inputRef={ref => { this.pageRef = ref }}
            height={canvasHeight}
            width={canvasWidth}
            onRenderSuccess={() => this.handleRenderSuccess()}
            /* Reduce redundant html elements */
            renderAnnotationLayer={false}
            renderTextLayer={false} />
        </Document>
        <div className="to-home-container">
          <Link to="/">
            <img
              src={HomeImg}
              alt="icon"
              className={"back-to-home-img" + (isConnected ? ' connected' : '')} />
          </Link>
        </div>

      </div>
    )
  }
}

export default Viewer
