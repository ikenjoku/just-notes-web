import React, { useEffect, Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { NoteFeed } from '../components'
import { GET_MY_NOTES } from '../gql/query'

function MyNotes () {
  const { data, loading, error } = useQuery(GET_MY_NOTES)

  useEffect(() => {
    document.title = 'My Notes - JustNotes'
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error fetching data...</p>

  if (data.me.notes.length > 0) {
    return <NoteFeed notes={data.me.notes} />
  } else {
    return <p>You have no made any notes...</p>
  }
}

export default MyNotes