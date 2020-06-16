import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Pages from './pages'
import { CreateGlobalStyle } from './components'

const uri = process.env.API_URI
const cache = new InMemoryCache()
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true
})

function App () {

  return (
    <ApolloProvider client={client}>
      <CreateGlobalStyle />
      <Pages />
    </ApolloProvider>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))