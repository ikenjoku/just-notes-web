import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Layout } from '../components'
import { IS_LOGGED_IN } from '../gql/query'

import Note from './note'
import Home from './home'
import SignUp from './signup'
import SignIn from './signin'
import UpdateNote from './edit'
import NewNote from './NewNote'
import MyNotes from './mynotes'
import Favorites from './favorites'

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path='/' component={Home} />
        <PrivateRoute exact path='/new' component={NewNote} />
        <Route exact path='/note/:id' component={Note} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/signin' component={SignIn} />
        <PrivateRoute exact path='/edit/:id' component={UpdateNote} />
        <PrivateRoute exact path='/mynotes' component={MyNotes} />
        <PrivateRoute exact path='/favorites' component={Favorites} />
      </Layout>
    </Router>
  )
}

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