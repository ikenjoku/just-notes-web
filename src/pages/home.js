import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client'
import { Button, NoteFeed } from '../components'
import { GET_NOTES } from '../gql/query'

function Home () {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error fetching data...</p>
  return (
    <Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {
        data.noteFeed.hasNextPage && (
          <Button
            style={{ marginLeft: 'auto' }}
            onClick={() => {
              return fetchMore({
                variables: { cursor: data.noteFeed.cursor },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  return {
                    noteFeed: {
                      cursor: fetchMoreResult.noteFeed.cursor,
                      hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                      notes: [
                        ...previousResult.noteFeed.notes,
                        ...fetchMoreResult.noteFeed.notes
                      ],
                      __typename: 'noteFeed'
                    }
                  }
                }
              })
            }}
          >Next Page</Button>
        )
      }
    </Fragment>
  )
}

export default Home
