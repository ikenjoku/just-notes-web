import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Navigation() {
  return (
    <Nav>
      <NavList>
        <li>
          <Link to="/new">
            <span aria-hidden="true" role="img">
              ➕
            </span>
            New Note
          </Link>
        </li>
        <li>
          <Link to="/">
            <span aria-hidden="true" role="img">
              🏠
            </span>
            Home
          </Link>
        </li>
        <li>
          <Link to="/mynotes">
          <span aria-hidden="true" role="img">
              🗒
            </span>
            My Notes
          </Link>
        </li>
        <li>
          <Link to="/favorites">
            <span aria-hidden="true" role="img">
              😍
            </span>
            Favorites
          </Link>
        </li>
      </NavList>
    </Nav>
  )
}

const Nav = styled.nav`
  padding: 1em;
  background: #f5f4f0;

  @media (max-width: 700px) {
    padding-top: 64px;
  }

  @media (min-width: 700px) {
    position: fixed;
    width: 220px;
    height: calc(100% - 64px);
    overflow-y: scroll;
  }
`

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 2;

  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    color: #333;

    span {
      padding-right: 0.5em;
      font-size: 1.5em;
    }
  }

  a:visited {
    color: #333;
  }

  a:hover,
  a:focus {
    color: #0077cc;
  }
`