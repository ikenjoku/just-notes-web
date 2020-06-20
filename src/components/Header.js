import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import logo from '../img/paper.svg'
import { ButtonAsLink } from '../components'
import { IS_LOGGED_IN } from '../gql/query'

export default function Header() {
  const history = useHistory()
  const { data, client } = useQuery(IS_LOGGED_IN)
  const handleLogOut = () => {
    localStorage.removeItem('token')
    client.resetStore()
    client.writeData({data: { isLoggedIn: false }})
    history.push('/')
  }

  return (
    <HeaderBar>
      <img src={logo} alt="Just Notes" height="40" />
      <LogoText>Just Notes</LogoText>

      <AuthActions>
        {
          data.isLoggedIn ?
          ( <ButtonAsLink onClick={handleLogOut}>Logout</ButtonAsLink> ) :
          (
            <p>
              <Link to={'/signin'}>Sign In</Link> or {' '}
              <Link to={'/signup'}>Sign Up</Link>
            </p>
          )
        }
      </AuthActions>
    </HeaderBar>
  )
}

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`
const AuthActions = styled.div`
  margin-left: auto;
`