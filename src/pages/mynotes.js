import React, { useEffect } from 'react'

function MyNotes () {

  useEffect(() => {
    document.title = 'My Notes - JustNotes'
  })

  return (
    <div>
      <h1>My Notes</h1>
      <p>Welcome to the Just-Note application</p>
    </div>
  )
}

export default MyNotes