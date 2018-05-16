/*global chrome*/

import React, { Component } from 'react'
import axios from 'axios'
import Qs from 'qs'

import './Index.css'

class Index extends Component {
  constructor() {
    super()

    this.state = {
      isSaved: false
    }

    this.save = this.save.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentDidMount() {
    this.check()
  }

  check() {
    chrome.storage.sync.get(['auth_token'], (result) => {
      axios({
        method:'get',
        url:'https://mark-it-api.herokuapp.com/link_users/check_url/',
        params: { 
          link_user: {
            auth_token: result.auth_token,
            url: window.location.href
          }
        },
        paramsSerializer: function(params) {
          return Qs.stringify(params, {arrayFormat: 'brackets'})
        }
      }).then((response) => {
        this.setState({ isSaved: response.status === 200 })
      }).catch((response) => {
  
      })
    })
  }

  save() {
    chrome.storage.sync.get(['auth_token'], (result) => {
      axios({
        method:'post',
        url:'https://mark-it-api.herokuapp.com/link_users/',
        params: { 
          link_user: {
            auth_token: result.auth_token,
            host: window.location.host,
            url: window.location.href
          }
        },
        paramsSerializer: function(params) {
          return Qs.stringify(params, {arrayFormat: 'brackets'})
        }
      }).then((response) => {
        this.setState({ isSaved: response.status === 200 })
      }).catch((response) => {
  
      })
    })
  }

  delete() {
    chrome.storage.sync.get(['auth_token'], (result) => {
      axios({
        method:'delete',
        url:'https://mark-it-api.herokuapp.com/link_users/destroy_by_url',
        params: { 
          link_user: {
            auth_token: result.auth_token,
            url: window.location.href
          }
        },
        paramsSerializer: function(params) {
          return Qs.stringify(params, {arrayFormat: 'brackets'})
        }
      }).then((response) => {
        this.setState({ isSaved: false })
      }).catch((response) => {
  
      })
    })
  }

  render() {
    const { isSaved } = this.state

    return (
      <React.Fragment>
        {
          !isSaved &&
          <div className='markIt__icon--red' onClick={ this.save }>
          </div>
        }

        { 
          isSaved &&
          <div className='markIt__icon--green' onClick={ this.delete }>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default Index