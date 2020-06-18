import React, { useEffect, Fragment } from 'react'
import { useMutation, gql } from '@apollo/client'
import { GET_NOTES, GET_MY_NOTES } from '../gql/query'
import { NoteForm } from '../components'

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

export default function NewNote({ history }) {
  useEffect(() => {
    document.title = 'New Note - Just Note'
  })

  const [createNewNote, { loading, error }] = useMutation(NEW_NOTE, {
    onCompleted: data => {
      history.push(`/note/${data.newNote.id}`)
    },
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }]
  })

  return (
    <Fragment>
      { loading && <p>Loading...Please wait</p> }
      { error && <p>Error saving note...Please try again.</p> }
      <NoteForm  action={createNewNote} />
    </Fragment>
  )
}
