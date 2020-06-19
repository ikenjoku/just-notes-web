import React from 'react'
import { ButtonAsLink } from '../components'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { DELETE_NOTE } from '../gql/mutation'
import { GET_MY_NOTES, GET_NOTES } from '../gql/query'

export default function DeleteNote({ noteId }) {
  const history = useHistory()
  const [deleteNote, { error, loading }] = useMutation(DELETE_NOTE, {
    onCompleted: data => {
      history.push('/mynotes')
    },
    refetchQueries: [{ query: GET_MY_NOTES} , {query: GET_NOTES }],
    variables: {
      id: noteId
    }
  })
  return (
    <ButtonAsLink onClick={deleteNote}>Delete</ButtonAsLink>
  )
}
