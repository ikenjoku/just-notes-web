import React, { useEffect, Fragment } from 'react';
import { useMutation, gql, useApolloClient } from '@apollo/client'
import { SIGNIN_USER } from '../gql/mutation'
import { UserForm } from '../components'

const SignUp = (props) => {

  const client =  useApolloClient()

  useEffect(() => {
    document.title = 'Sign In — JustNotes'
  })

  const [ signIn, { error, loading} ] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn)
      client.writeData({data: { isLoggedIn: true }})
      if (props.location.state) {
        props.history.push(props.location.state.from.pathname)
      } else {
        props.history.push('/')
      }
    }
  })

  return (
    <Fragment>
      <UserForm action={signIn} formType="signin" />
      { loading && <p>Loading...</p> }
      { error && <p>There was an error signing into your account...</p> }
    </Fragment>
  )
}

export default SignUp
