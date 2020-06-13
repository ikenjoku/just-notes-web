import React from 'react'
import ReactDOM from 'react-dom'
import Pages from './pages'
import { CreateGlobalStyle } from './components'

function App () {

  return (
    <div>
      <CreateGlobalStyle />
      <Pages />
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))