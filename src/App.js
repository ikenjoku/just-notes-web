import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import Pages from './pages'
import { CreateGlobalStyle } from './components'

const uri = process.env.API_URI
const httpLink = createHttpLink({ uri })
const cache = new InMemoryCache()

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  }
})


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
})

const data = {
  isLoggedIn: !!localStorage.getItem('token')
}

cache.writeData({ data })

client.onResetStore(() => cache.writeData({ data }))

function App () {

  return (
    <ApolloProvider client={client}>
      <CreateGlobalStyle />
      <Pages />
    </ApolloProvider>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))