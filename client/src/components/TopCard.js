import React, { Component } from 'react'

import HomeImg from "../img/home.svg"
import CrossImg from "../img/cross.svg"
import SearchImg from "../img/search.svg"

const WAITING_FOR_ADDING_HISTORY_TIMEOUT = 1000

class SearchInput extends Component {
  constructor() {
    super()
    this.timeOutHistory = null
  }

  handleChange(e) {
    this.props.updateInputText(e.target.value)
    this.props.search(e.target.value)
  }

  handleBlur() {
    this.props.addHistory(this.props.inputText)
  }

  handleKeyUp() {
    // Clean setTimeout after a second
    clearTimeout(this.timeOutHistory)
    this.timeOutHistory = setTimeout(() => {
      this.props.addHistory(this.props.inputText)
    }, WAITING_FOR_ADDING_HISTORY_TIMEOUT)
  }

  render() {
    const { inputText, isCleaned, clearInputText, backToHome } = this.props
    return (
      <div className="search-card">
        <input
          className="search-card__input"
          type="text"
          placeholder="Title / Artist / Volume"
          value={inputText}
          onChange={e => this.handleChange(e)}
          onKeyUp={() => this.handleKeyUp()}
          onBlur={() => this.handleBlur()}
          ref={(ref) => { this.input = ref }} />
        <div className="icon-container icon-container--left">
          <img
            src={HomeImg}
            alt="icon"
            className="home-img"
            onClick={backToHome}/>
        </div>
        <div className="icon-container icon-container--right">
          <img
            src={CrossImg}
            alt="icon"
            className={isCleaned ? 'hide' : 'cross-img'}
            onClick={() => {
              clearInputText()
              this.input.focus()
            }} />
          <img
            src={SearchImg}
            alt="icon"
            className={isCleaned ? 'search-img' : 'hide'}
            onClick={() => this.input.focus()} />
        </div>
      </div>
    );
  }
}

export default SearchInput;
