import React from 'react'
import {createStore as initialCreateStore, compose} from 'redux'

export let createStore = initialCreateStore
var __DEV__ = false

if (__DEV__) {
	const {devTools, persistState} = require('redux-devtools')
	createStore = compose(
		devTools(),
		persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
	)(createStore)
}

export function renderDevTools(store) {
	if (__DEV__) {
		let {DevTools, DebugPanel, LogMonitor} = require('redux-devtools/lib/react')
		return (
			<DebugPanel top={true} right={true} bottom={true}>
				<DevTools store={store} monitor={LogMonitor} />
			</DebugPanel>
		)
	}
	return null
}
