import React, { useEffect } from 'react';

function Favorites () {
  useEffect(() => {
    document.title = 'Favorites - JustNotes'
  })

  return (
    <div>
      <h1>Just Notes</h1>
      <p>These are my Favorites</p>
    </div>
  );
};

export default Favorites
