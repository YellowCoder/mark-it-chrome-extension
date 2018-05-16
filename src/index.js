import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import MarkerApp from './Marker/Index'
import PopUpApp from './PopUp/Index'

import registerServiceWorker from './registerServiceWorker'

const markerElement = document.getElementById('markItRoot')
const popUpElement = document.getElementById('root')

if (markerElement) {
  ReactDOM.render(<MarkerApp />, markerElement)
}

if (popUpElement) {
  ReactDOM.render(<PopUpApp />, popUpElement)
}

registerServiceWorker()
