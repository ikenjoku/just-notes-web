import React from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components';
import { Note } from '../components'
import { GET_NOTE } from '../gql/query'

const NoteWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 3px solid #f5f4f0;
`

export default function NotePage ({ match }) {
  const noteId = match.params.id
  const { data, error, loading } = useQuery(GET_NOTE, { variables: { id: noteId } })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error fetching this note...</p>
  return (
    <NoteWrapper>
      <Note note={data.note}/>
    </NoteWrapper>
  )
}
