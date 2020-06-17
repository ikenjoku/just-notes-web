import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Layout } from '../components'

import Note from './note'
import Home from './home'
import SignUp from './signup'
import SignIn from './signin'
import MyNotes from './mynotes'
import Favorites from './favorites'

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/note/:id' component={Note} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/signin' component={SignIn} />
        <PrivateRoute exact path='/mynotes' component={MyNotes} />
        <PrivateRoute exact path='/favorites' component={Favorites} />
      </Layout>
    </Router>
  )
}

const IS_LOGGED_IN = gql`
{
  isLoggedIn @client
}
`

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
    <Route
      { ...rest }
      render={props => data.isLoggedIn === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }}
        />
      )}
    />
  )
}

export default Pages