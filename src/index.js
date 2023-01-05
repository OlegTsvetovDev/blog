import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import { fetchUsers } from './features/users/usersSlice'
import store from './app/store'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'


store.dispatch(fetchUsers())

render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />  } />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
