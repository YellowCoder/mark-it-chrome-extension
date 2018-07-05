import React, { Component } from 'react';

import SignIn from './components/SignIn'

import './Index.css'

class Index extends Component {
  render() {
    return (
      <div className="popUp__wrapper">
        <SignIn />
      </div>
    )
  }
}

export default Index