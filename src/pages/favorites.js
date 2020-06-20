import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { NoteFeed } from '../components'
import { GET_MY_FAVORITES } from '../gql/query'

function Favorites () {
  const { data, error, loading } = useQuery(GET_MY_FAVORITES)

  useEffect(() => {
    document.title = 'Favorites - JustNotes'
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error fetching favorites...</p>

  if (data.me.favorites.length > 0) {
    return <NoteFeed notes={data.me.favorites} />
  } else {
    return <p>You have no favorites yet...</p>
  }
}

export default Favorites
