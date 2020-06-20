import React, { Fragment } from 'react'
import { useMutation, gql, useQuery } from '@apollo/client'
import { NoteForm } from '../components'
import { GET_NOTE, GET_ME } from '../gql/query'
import { UPDATE_NOTE } from '../gql/mutation'

export default function UpdateNote({ match, history }) {
  const noteId = match.params.id
  const { data, loading: fetchingNoteData, error: errorFetchingNote } = useQuery(GET_NOTE, { variables: { id: noteId } })
  const { data: userData, loading: fetchingUserData, error:errorFetchingUserData } = useQuery(GET_ME)

  const [updateNote, { loading: updatingNote, error: errorUpdatingNote }] = useMutation(UPDATE_NOTE, {
    onCompleted: data => {
      history.push(`/note/${data.updateNote.id}`)
    },
    variables: {
      id: noteId
    }
  })

  if (fetchingNoteData) return  <p>Loading...Please wait</p>
  if (fetchingUserData) return  <p>Loading...Please wait</p>
  if (errorFetchingNote) return  <p>Sorry...Note not found</p>
  if (errorFetchingUserData) return  <p>User not found. Please sign in</p>
  if (userData.me.id !== data.note.author.id) return  <p>You cannot update this note.</p>
  if (updatingNote) return <p>Loading...Please wait</p>
  if (errorUpdatingNote) return <p>Error updating note...Please try again</p>
  return (
    <Fragment>
      <NoteForm action={updateNote} content={data.note.content} />
    </Fragment>
  )
}
