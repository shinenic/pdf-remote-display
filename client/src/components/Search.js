import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import webSocket from 'socket.io-client'

import TopCard from './TopCard'
import Result from './result/Result'
import NoResultHint from './NoResultHint'
import matchSorter from 'match-sorter'
import { api } from '../config/index'

import {
  SEARCH_MODE_TYPE,
  SEARCH_RESULT_TYPE,
  SOCKET_EVENT
} from '../constants/index'
import songListData from '../data/songSearch'
import { clearAllBlank, isZhuyin, getUrlPath, getUrlQueryParams, getUrlWithMergedParams } from '../utils/base'

const INIT_RESULT_COUNT = 20
const ADD_RESULT_COUNT = 50

class Search extends Component {
  constructor() {
    super()
    this.state = {
      inputText: '',
      result: [],
      history: [],
      isCleaned: true,
      currentCount: INIT_RESULT_COUNT,
      incognito: false,
      searchMode: null,
      data: [],
      ws: null,
      isConnectedSocket: false,
      selectedIndex: -1,
      isPDFLoadSuccess: false
    }
  }

  async componentDidMount() {
    // Get searchMode from <Link>'s props or from url
    const { searchMode = getUrlPath()[0] } = this.props.location
    const { s: searchParam, incognito } = getUrlQueryParams()
    const data = await this.getDataList(searchMode)
    this.setSearchInitState(searchMode, data, incognito, searchParam)
    this.connectWebSocket()
    window.addEventListener('scroll', () => this.handleScroll())

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => this.handleScroll())
  }

  async getDataList(searchMode) {
    let data
    switch (searchMode) {
      case SEARCH_MODE_TYPE.FILE_LIST:
        await axios.get(api.getFileList).then(res => { data = res.data })
        break
      case SEARCH_MODE_TYPE.SONG_LIST:
        data = songListData
        break
      default:
        data = []
    }
    return data
  }

  setSearchInitState(searchMode, data, incognito, searchParam) {
    this.setState({
      searchMode,
      data,
      incognito: !!incognito
    }, () => {
      if (searchParam) {
        this.search(searchParam)
        this.updateInputText(searchParam)
      }
    })
  }

  connectWebSocket() {
    this.setState({ ws: webSocket(api.webSocket) }, () => {
      const { ws } = this.state
      const { VIEWER_STATUA } = SOCKET_EVENT
      ws.on('connect', () => {
        this.setState({ isConnectedSocket: !!ws.connected })
      })
      ws.on('viewerStatus', status => {
        this.setState({ isPDFLoadSuccess: status === VIEWER_STATUA.PDF_LOAD_SUCCESS })
      })
      ws.on('fileIndex', file => {
        this.setState({ selectedIndex: file.index, isPDFLoadSuccess: false })
      })
    })
  }

  sendFileIndex(index) {
    const { FILE_INDEX } = SOCKET_EVENT
    this.state.ws.emit('fileIndex', { action: FILE_INDEX.SET_FILE_INDEX, index })
  }

  // TODO: When scroll down to specific position, it will show a icon and auto scroll to top after clicked
  handleScroll() {
    const { currentCount, result } = this.state
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 60
      && currentCount !== result.length) {
      this.setState({
        currentCount: currentCount + ADD_RESULT_COUNT > result.length
          ? result.length + 1
          : currentCount + ADD_RESULT_COUNT
      })
    }
  }

  updateInputText(str) {
    this.setState({ inputText: str })
  }

  search(str) {
    const content = clearAllBlank(str)
    const { data } = this.state
    // If the input(removed all blank) is not empty and the last character is not Zhuyin
    if (!isZhuyin(content.slice(-1)) && content !== '') {
      const result = matchSorter(data, content)
      this.setState({
        result,
        isCleaned: false,
        currentCount: INIT_RESULT_COUNT
      })
      // Scroll to top if result has been changed
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  saveToDatabase(dbUrl, content) {
    axios.post(dbUrl, { "content": content }).catch(err => console.error(err))
  }

  addHistory(str) {
    const { incognito } = this.state
    const content = clearAllBlank(str)
    const { history } = this.state
    // If the input(removed all blank) is not empty
    // , the last character is not Zhuyin and have no duplicated history
    if (!isZhuyin(content.slice(-1)) && content !== '' && (history.length === 0 || str !== history[0])) {
      this.setState({ history: [content, ...history] })
      this.props.history.push(getUrlWithMergedParams(undefined, { s: content, incognito }))
      !incognito && this.saveToDatabase(api.addHistory, content)
    }
  }

  // TODO: Add polyfill for smooth scrollTop
  clearInputText() {
    if (this.state.inputText !== '') {
      // It will update inputText only but result
      this.setState({ inputText: '' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      this.setState({ result: [], isCleaned: true })
    }
    this.props.history.push(getUrlWithMergedParams(undefined, { s: '' }))
  }

  backToHome() {
    this.props.history.push(getUrlWithMergedParams('/', { s: '' }))
  }

  findArtist(artist) {
    const artistWithoutDelimiters = artist.replace(/[/+]/ig, ' ')
    this.search(artistWithoutDelimiters)
    this.updateInputText(artistWithoutDelimiters)
    this.addHistory(artistWithoutDelimiters)
  }

  getDisplayMode() {
    if (this.state.inputText !== '' && !isZhuyin(clearAllBlank(this.state.inputText).slice(-1)))
      return SEARCH_RESULT_TYPE.NO_RESULT
    else
      return SEARCH_RESULT_TYPE.NO_KEYWORD
  }

  render() {
    const {
      inputText,
      isCleaned,
      result,
      isConnectedSocket,
      currentCount,
      searchMode,
      selectedIndex,
      isPDFLoadSuccess
    } = this.state
    const isNoResult = result.length === 0

    const placeHolderText = searchMode === SEARCH_MODE_TYPE.FILE_LIST
      ? 'Search for PDF file' : 'Title / Artist / Volume'

    return (
      <div className="search-container">
        <div style={{ height: '35px' }} />
        <TopCard
          inputText={inputText}
          isCleaned={isCleaned}
          placeHolderText={placeHolderText}
          clearInputText={() => this.clearInputText()}
          updateInputText={str => this.updateInputText(str)}
          search={str => this.search(str)}
          backToHome={() => this.backToHome()}
          addHistory={str => this.addHistory(str)}
          isConnectedSocket={isConnectedSocket} />
        <Result
          result={result}
          currentCount={currentCount}
          searchMode={searchMode}
          selectedIndex={selectedIndex}
          isPDFLoadSuccess={isPDFLoadSuccess}
          sendFileIndex={index => this.sendFileIndex(index)}
          findArtist={str => this.findArtist(str)} />
        {isNoResult && <NoResultHint displayMode={this.getDisplayMode()} />}
      </div>
    )
  }
}

export default withRouter(Search)
