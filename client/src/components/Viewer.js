import React, { Component } from 'react'
import webSocket from 'socket.io-client'
import { Link } from 'react-router-dom'

import { pdfjs } from 'react-pdf'
import { Document, Page } from 'react-pdf'

import { RENDER_SIZE_BY_HEIGHT, RENDER_SIZE_BY_WIDTH } from '../constants'
import { getViewport } from '../utils/base'
import { pdfjsWorkerSrc, samepleFile, api } from '../config'
import HomeImg from "../img/home.svg"

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerSrc(pdfjs.version)

// TODO: Render pdf canvas according to width or height
// TODO: Add float buttun on top side (which can link to home page)

class Viewer extends Component {
  state = {
    pageCount: null,
    pageNumber: 1,
    pdfDisplayMode: RENDER_SIZE_BY_HEIGHT, // RENDER_SIZE_BY_WIDTH
    ws: null,
    fileUrl: '',
    isConnected: false
  }

  componentDidMount() {
    this.connectWebSocket()
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
    this.setState({
      fileUrl: `${api.getPdfFile}?index=${index}`
    })
  }

  handleDocumentLoadSuccess(pdf) {
    this.setState({ pageCount: pdf.numPages })
  }

  handleOnClick() {
    const { pageCount, pageNumber } = this.state
    if (pageCount === 1) return null
    this.setState({
      pageNumber: pageCount === pageNumber ? 1 : pageNumber + 1
    })
  }

  render() {
    const { pageNumber, fileUrl, isConnected } = this.state
    const viewport = getViewport()

    return (
      <div className="viewer" onClick={() => this.handleOnClick()}>
        <Document
          file={fileUrl}
          className="pdf-container"
          onLoadSuccess={pdf => this.handleDocumentLoadSuccess(pdf)}>
          <Page
            pageNumber={pageNumber}
            height={viewport.height}
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
