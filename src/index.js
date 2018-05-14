import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import App from './App'
import PopUpApp from './PopUpApp'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('markItRoot'))
ReactDOM.render(<PopUpApp />, document.getElementById('root'))

registerServiceWorker()
