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
    this.connectWebSocket()
    const localObj = JSON.parse(localStorage.getItem('fileUrl'))
    if (localObj.timeStamp + LOCAL_STORAGE_TIMEOUT > getNowTime()) {
      this.setState({ fileUrl: localObj.fileUrl })
    }
  }

  connectWebSocket() {
    this.setState({ ws: webSocket(api.webSocket) }, () => {
      const { ws } = this.state
      ws.on('getPDFFile', res => {
        this.setFileUrl(res)
      })
      ws.on('connect', () => {
        this.setState({ isConnected: !!ws.connected })
      })
    })
  }

  setFileUrl(index) {
    this.setState({ fileUrl: `${api.getPdfFile}?index=${index}` })
  }

  handleDocumentLoadSuccess(pdf) {
    const { ws, fileUrl } = this.state
    this.setState({ pageCount: pdf.numPages })
    ws.emit('fileLoad', PDF_LOAD_SUCCESS)
    localStorage.setItem('fileUrl', JSON.stringify({ fileUrl, timeStamp: getNowTime() }))
  }

  handleRenderSuccess() {
    const { pdfDisplayMode } = this.state
    const viewport = getViewport()
    const canvasWidth = this.pageRef.firstChild.style.width.replace('px', '')
    const canvasHeight = this.pageRef.firstChild.style.height.replace('px', '')
    if (canvasWidth > viewport.width && pdfDisplayMode === RENDER_SIZE_BY_HEIGHT) {
      this.setState({ pdfDisplayMode: RENDER_SIZE_BY_WIDTH })
    } else if (canvasHeight > viewport.height && pdfDisplayMode === RENDER_SIZE_BY_WIDTH) {
      this.setState({ pdfDisplayMode: RENDER_SIZE_BY_HEIGHT })
    }
  }

  handleOnClick() {
    const { pageCount, pageNumber } = this.state
    if (pageCount === 1) return null
    this.setState({
      pageNumber: pageCount === pageNumber ? 1 : pageNumber + 1
    })
  }

  render() {
    const { pageNumber, fileUrl, isConnected, pdfDisplayMode } = this.state
    const viewport = getViewport()
    const canvasHeight = pdfDisplayMode === RENDER_SIZE_BY_HEIGHT ? viewport.height : null
    const canvasWidth = pdfDisplayMode === RENDER_SIZE_BY_WIDTH ? viewport.width : null

    return (
      <div className="viewer" onClick={() => this.handleOnClick()}>
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
        <Link to="/">
          <img
            src={HomeImg}
            alt="icon"
            className={"back-to-home-img" + (isConnected ? ' connected' : '')} />
        </Link>
      </div>
    )
  }
}

export default Viewer
