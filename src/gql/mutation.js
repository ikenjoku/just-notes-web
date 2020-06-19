import { gql } from '@apollo/client'

const UPDATE_NOTE = gql`
mutation updateNote ($content: String!, $id: ID!){
  updateNote (content: $content, id: $id){
    id
    content
    createdAt
    favoriteCount
    favoritedBy {
      id
      username
    }
    author {
      username
      id
    }
  }
}
`

const NEW_NOTE = gql`
  mutation newNote ($content: String!){
    newNote (content: $content){
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`

const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`

const SIGNIN_USER = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`

export {
  NEW_NOTE,
  UPDATE_NOTE,
  SIGNIN_USER,
  SIGNUP_USER,
  DELETE_NOTE
}