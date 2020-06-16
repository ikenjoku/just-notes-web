import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Note } from '../components'
import styled from 'styled-components';

const NoteWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 3px solid #f5f4f0;
`

const GET_NOTE = gql`
  query note($id: ID!) {
    note(id:$id) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
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
