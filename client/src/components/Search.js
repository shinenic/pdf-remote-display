import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import TopCard from './TopCard'
import Result from './Result'
import NoResultHint from './NoResultHint'
import matchSorter from 'match-sorter'

// import dataArray from '../data/songSearch'
import fileList from '../data/songFilePathObj'
import { clearAllBlank, isZhuyin, getUrlPath, getUrlQueryParams } from '../utils/base'

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
      incognito: false
    }
  }

  componentDidMount() {
    // Set scroll event listener
    const { s: searchParam, incognito } = getUrlQueryParams()
    if (searchParam) {
      this.search(searchParam)
      this.updateInputText(searchParam)
    }
    if (incognito) {
      this.setState({ incognito: true })
    }
    window.addEventListener('scroll', () => this.handleScroll())
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => this.handleScroll())
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
    // If the input(removed all blank) is not empty and the last character is not Zhuyin
    if (!isZhuyin(content.slice(-1)) && content !== '') {
      // const result = matchSorter(dataArray, content)
      const result = matchSorter(fileList, content, { keys: ['name', 'locatedFolder'] })
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
    const incognitoParam = incognito ? '&incognito=true' : ''
    // If the input(removed all blank) is not empty
    // , the last character is not Zhuyin and have no duplicated history
    if (!isZhuyin(content.slice(-1)) && content !== '' && (history.length === 0 || str !== history[0])) {
      this.setState({ history: [content, ...history] })
      this.props.history.push(encodeURI(`search?s=${content}${incognitoParam}`))
      !incognito && this.saveToDatabase('https://songsearch.kadenzwei.com/api/ss', content)
    }
  }

  // TODO: Add polyfill for smooth scrollTop
  clearInputText() {
    const { incognito } = this.state
    if (this.state.inputText !== '') {
      // It will update inputText only but result
      this.setState({ inputText: '' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      this.setState({ result: [], isCleaned: true })
    }
    this.props.history.push(incognito ? '?incognito=true' : '')
  }

  findArtist(artist) {
    const artistWithoutDelimiters = artist.replace(/[/+]/ig, ' ')
    this.search(artistWithoutDelimiters)
    this.updateInputText(artistWithoutDelimiters)
    this.addHistory(artistWithoutDelimiters)
  }

  getDisplayMode() {
    if (this.state.inputText !== '' && !isZhuyin(clearAllBlank(this.state.inputText).slice(-1)))
      return 'NO_RESULT'
    else
      return 'DEFAULT'
  }

  render() {
    const {
      inputText,
      isCleaned,
      result,
      currentCount
    } = this.state
    const isNoResult = result.length === 0
    console.log(this.state.result)

    return (
      <div className="search-container">
        <div style={{ height: '35px' }} />
        <TopCard
          inputText={inputText}
          isCleaned={isCleaned}
          clearInputText={() => this.clearInputText()}
          updateInputText={str => this.updateInputText(str)}
          search={str => this.search(str)}
          addHistory={str => this.addHistory(str)} />
        {result.slice(0, currentCount).map((data, index) =>
          // <Result
          //   key={index}
          //   title={data[0]}
          //   artist={data[1]}
          //   volume={data[2]}
          //   page={data[3]}
          //   findArtist={() => this.findArtist(data[1])} />
          <Result
            key={index}
            fileName={data.name}
            index={data.index}
            locatedFolder={data.locatedFolder} />
        )}
        {isNoResult && <NoResultHint displayMode={this.getDisplayMode()} />}
      </div>
    )
  }
}

export default withRouter(Search)
