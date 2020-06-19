import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { DeleteNote } from '../components'
import { GET_ME } from '../gql/query'

export default function NoteUser(props) {
  const { data, error, loading } = useQuery(GET_ME)
  if (loading) return <p>Laoding...</p>
  if (error) return <p>Error fetching user...</p>
  const isAuthorOfNote = data.me.id === props.note.author.id
  return (
    <Fragment>
      { isAuthorOfNote && <Link to={`/edit/${props.note.id}`} >Edit</Link> }{' '}
      { isAuthorOfNote && <DeleteNote noteId={props.note.id} /> }
    </Fragment>
  )
}
