import React from 'react'
import ReactDOM from 'react-dom'
import Fight from './containers/Fight/FightContainer'
import store from './store'
import { Provider } from 'react-redux'
import { red500 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './index.css'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: red500
  },
  appBar: {
    height: 50
  }
})

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Fight />
  </MuiThemeProvider>
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
