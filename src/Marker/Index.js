/*global chrome*/

import React, { Component } from 'react'

import { checkURL, saveURL, deleteURL } from '../utils/requester'

import './Index.css'

class Index extends Component {
  constructor() {
    super()

    this.state = {
      isLoading: true,
      isSaved: false,
      isLogged: null
    }

    this.save = this.save.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentWillMount() {
    chrome.storage.sync.get(['auth_token'], (data) => {
      this.setState({ isLogged: data.auth_token !== null })
    })
    this.check()
  }

  check() {
    chrome.storage.sync.get(['auth_token'], (data) => {
      if (!data.auth_token) return
      checkURL(data)
        .then((response) => {
          this.setState({
            isLoading: false,
            isSaved: response.status === 200
          })
        }).catch((response) => {
          this.setState({ isLoading: false })
        })
    })
  }

  save() {
    chrome.storage.sync.get(['auth_token'], (data) => {
      saveURL(data)
        .then((response) => {
          this.setState({ isSaved: response.status === 200 })
        }).catch((response) => {
          this.setState({ isLoading: false })
        })
    })
  }

  delete() {
    chrome.storage.sync.get(['auth_token'], (data) => {
      deleteURL(data)
        .then((response) => {
          this.setState({ isSaved: false })
        }).catch((response) => {
          this.setState({ isLoading: false })
        })
    })
  }

  render() {
    const { isSaved, isLoading, isLogged } = this.state

    if (!isLogged) return null

    return (
      <React.Fragment>
        {
          !isLoading &&
          !isSaved &&
          <div className='markIt__icon--red' onClick={ this.save }>
          </div>
        }

        { 
          !isLoading &&
          isSaved &&
          <div className='markIt__icon--green' onClick={ this.delete }>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default Index
