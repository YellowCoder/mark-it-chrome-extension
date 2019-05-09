/*global chrome*/

import React from 'react'
import axios from 'axios'

import UserProfile from './UserProfile'

import './SignIn.css'

class SignIn extends React.Component {
  constructor() {
    super()

    this.state = {
      sending: false,
      authToken: null,
      error: '',
      email: '',
      password: ''
    }
  }

  componentWillMount() {
    if (chrome.storage) {
      chrome.storage.sync.get(['auth_token'], (data) => {
        this.setState({ authToken: data.auth_token })
      })
    } else {
      this.setState({ authToken: localStorage.getItem('auth_token') })
    }
  }

  login() {
    this.setState({ sending: true })

    axios.post('https://mark-it-api.herokuapp.com/sessions',
      { 
        session: { 
          email: this.state.email, 
          password: this.state.password 
        }
      }
    )
    .then((response) => {
      const authToken = response.data.auth_token
      this.setState({ sending: false, authToken, error: '' })
      chrome.storage.sync.set({ auth_token: authToken })
      localStorage.setItem('auth_token', authToken)
    })
    .catch((response) => {
      this.setState({ error: 'Invalid email or password.', sending: false })
    })
  }
  
  changeValue(fieldName, event) {
    this.setState({
      [fieldName]: event.target.value
    })
  }

  render() {
    const { authToken, error, sending, email, password } = this.state

    return(
      <div className="signIn__form">
        {
          error &&
          <div className="signIn__errors">
            <span>{ error }</span>
          </div>
        }

        { 
          sending &&
          <p>Loading ...</p>   
        }

        {
          authToken &&
          <UserProfile />
        }

        { 
          !authToken &&
          !sending &&
          <React.Fragment>
            <h2>Mark it Login</h2>
            <div className="signIn__formGroup">
              <label htmlFor="email">Email:</label>
              <input value={ email } id="email" onChange={ this.changeValue.bind(this, 'email') }/>
            </div>

            <div className="signIn__formGroup">
              <label htmlFor="password">Password:</label>
              <input value={ password } id="password" type="password" onChange={ this.changeValue.bind(this, 'password') }/>
            </div>

            <div className="signIn__formGroup">
              <button onClick={ this.login.bind(this) }>Login</button>
            </div>
          </React.Fragment>
        }
      </div>
    )
  }
}

export default SignIn