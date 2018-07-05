/*global chrome*/

import React, { Component } from 'react'

import { checkURL, saveURL, deleteURL } from '../utils/requester'

import './Index.css'

class Index extends Component {
  constructor() {
    super()

    this.state = {
      isLoading: true,
      isSaved: false
    }

    this.save = this.save.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentDidMount() {
    this.check()
  }

  check() {
    chrome.storage.sync.get(['auth_token'], (data) => {
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
    const { isSaved, isLoading } = this.state

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
