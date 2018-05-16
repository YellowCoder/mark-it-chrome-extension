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
    localStorage.removeItem('auth_token')
    this.setState({ authToken: null })
  }

  login() {
    this.setState({ sending: true })

    axios.post('https://mark-it-api.herokuapp.com/users/authenticate', 
      { 
        user: { 
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
              <input value={ password } id="password"  onChange={ this.changeValue.bind(this, 'password') }/>
            </div>

            <button onClick={ this.login.bind(this) }>Login</button>
          </React.Fragment>
        }
      </div>
    )
  }
}

export default SignIn