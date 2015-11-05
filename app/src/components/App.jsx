import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {createStore, renderDevTools} from '../utils/devTools'
import {CardPage} from './CardPage'
import reducer from '_reducers/'

const store = createStore(reducer)

export default class App extends Component {

	render() {
		return (
			<div>
				<Provider {...{store}}>
					{() => <CardPage />}
				</Provider>

				{renderDevTools(store)}
			</div>
		)
	}
}

