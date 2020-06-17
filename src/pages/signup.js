import React, { useEffect, Fragment } from 'react';
import { useMutation, gql, useApolloClient } from '@apollo/client'
import { UserForm } from '../components'

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`

const SignUp = ({ history }) => {

  const client =  useApolloClient()

  useEffect(() => {
    document.title = 'Sign Up — JustNotes'
  })

  const [ signUp, { error, loading} ] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signUp)
      client.writeData({data: { isLoggedIn: true }})
      history.push('/')
    }
  })

  return (
    <Fragment>
      <UserForm action={signUp} formType="signup" />
      { loading && <p>Loading...</p> }
      { error && <p>There was an error creating your account...</p> }
    </Fragment>
  )
}

export default SignUp
