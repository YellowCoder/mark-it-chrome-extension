/*global chrome*/

import React from 'react'
import axios from 'axios'

class UserProfile extends React.Component {
  componentDidMount() {
    if (chrome.storage) {
      chrome.storage.sync.get(['auth_token'], (data) => {
        this.fetchUserProfile(data.auth_token)
      })
    } else {
      this.fetchUserProfile(localStorage.getItem('auth_token'))
    }
  }

  fetchUserProfile(authToken) {
    axios.get(`http://localhost:3000/users/${ authToken }`)
  }

  logout() {
    const { authToken } = this.state

    const params = {
      auth_token: authToken,
    }

    axios.delete(`https://mark-it-api.herokuapp.com/sessions/${ authToken }`, { params })
    .then((response) => {
      localStorage.removeItem('auth_token')
      chrome.storage.sync.remove(['auth_token'], (data) => {
        this.setState({ authToken: null, error: '' })
      })
    })
    .catch((response) => {
      this.setState({ error: 'Error!', sending: false })
    })
  }

  render () {
    return(
      <React.Fragment>
        <p>Logado!</p>
        <button onClick={ this.logout.bind(this) }>Logout</button>
      </React.Fragment>
    )
  }
}

export default UserProfile