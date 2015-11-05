import React, {createElement} from 'react'
import {render} from 'react-dom'
import App from '_components/App.jsx'

const rootEl = document.getElementById('root')
render(createElement(App), rootEl)
