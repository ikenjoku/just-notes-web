import React from 'react'
import { format } from 'date-fns'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { useQuery } from '@apollo/client'
import { IS_LOGGED_IN } from '../gql/query'
import { NoteUser } from '../components'

const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
`

const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`

const MetaInfo = styled.div`
  padding-right: 1em;
`
const UserActions = styled.div`
  margin-left: auto;
`

const Note = ({ note }) => {
  const { data, error, loading } = useQuery(IS_LOGGED_IN)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error fetching user...</p>

  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
            src={note.author.avatar}
            alt={`${note.author.username} avatar`}
            height="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {note.author.username} <br />
          {format(note.createdAt, 'MMM Do YYYY hh:mm:ss')}
        </MetaInfo>
        <UserActions>
          { data.isLoggedIn &&  <NoteUser note ={note} /> }
          <div><em>Favorites:</em> {note.favoriteCount}</div>
        </UserActions>
      </MetaData>
        <ReactMarkdown source={note.content} />
    </StyledNote>
  );
};

export default Note
