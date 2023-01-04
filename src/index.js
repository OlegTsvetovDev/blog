import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { fetchUsers } from './features/users/usersSlice'
import store from './app/store'
import './index.css'


store.dispatch(fetchUsers())

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />  
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
