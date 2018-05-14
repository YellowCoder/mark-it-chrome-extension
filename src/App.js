import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      isSaved: false
    }
  }

  render() {
    const { isSaved } = this.state

    return (
      <React.Fragment>
        {
          !isSaved &&
          <div className='markIt__icon--red'>
          </div>
        }

        { 
          isSaved &&
          <div className='markIt__icon--green'>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default App;
