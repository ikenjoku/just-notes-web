import React, { useState, Fragment } from 'react'
import { useMutation } from '@apollo/client'
import { ButtonAsLink } from '../components'
import { TOGGLE_FAVORITE } from '../gql/mutation'
import { GET_MY_FAVORITES } from '../gql/query'

export default function FavoriteNote({ me, noteId, favoriteCount }) {
  const [count, setCount] = useState(favoriteCount)
  const [ favorited, setFavorited ] = useState(me.favorites.filter(note => note.id === noteId).length > 0)

  const [toggleFavorite, { data, error }]= useMutation(TOGGLE_FAVORITE, {
    refetchQueries: [{ query: GET_MY_FAVORITES }],
    variables: {
      id: noteId
    }
  })
  return (
    <Fragment>
      { favorited ? (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite()
            setFavorited(false)
            setCount(count - 1 )
          }}
        >Remove favorites</ButtonAsLink>
        ) : (
          <ButtonAsLink
            onClick={() => {
              toggleFavorite()
              setFavorited(true)
              setCount(count + 1 )
            }}
          >Add to favorites</ButtonAsLink>
        )
      }
    </Fragment>
  )
}
