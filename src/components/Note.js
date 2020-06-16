import React from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import styled from 'styled-components'

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

const UnstyledLink = styled(Link)`
  text-decoration: none;
  pointer: cursor;
`

const Note = ({ note }) => {
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
          <em>Favorites:</em> {note.favoriteCount}
        </UserActions>
      </MetaData>
      {/* <UnstyledLink to={`/note/${note.id}`}> */}
        <ReactMarkdown source={note.content} />
      {/* </UnstyledLink> */}
    </StyledNote>
  );
};

export default Note
