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
      <div className="markIt__icon--red">
      </div>
    )
  }
}

export default App;
