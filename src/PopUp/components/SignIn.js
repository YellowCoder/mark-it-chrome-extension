/*global chrome*/

import React from 'react'
import axios from 'axios'

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
    this.setState({ authToken: localStorage.getItem('auth_token') })
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
        this.setState({ authToken: null })
      })
    })
    .catch((response) => {
      this.setState({ error: 'Error!', sending: false })
    })
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
      this.setState({ sending: false, authToken })
      chrome.storage.sync.set({ auth_token: authToken })
      localStorage.setItem('auth_token', authToken)
    })
    .catch((response) => {
      this.setState({ error: 'Error!', sending: false })
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
          <p>{ error }</p>
        }

        { 
          sending &&
          <p>Loading ...</p>   
        }

        {
          authToken &&
          <React.Fragment>
            <p>Logado!</p>
            <button onClick={ this.logout.bind(this) }>Logout</button>
          </React.Fragment>
        }

        { 
          !authToken &&
          !sending &&
          <React.Fragment>
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