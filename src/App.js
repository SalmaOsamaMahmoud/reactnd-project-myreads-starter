import React, { useState, useEffect } from 'react'
import './App.css'
import BookList from './BookList'
import { Route } from 'react-router-dom'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'

const App = () => {
  const shelves = [
    { value: 'currentlyReading', name: 'Currently Reading' },
    { value: 'wantToRead', name: 'Want to Read' },
    { value: 'read', name: 'Read' },
    { value: 'none', name: 'None' },
  ]
  const [shelfBooks, setShelfBooks] = useState([])

  useEffect(() => {
    BooksAPI.getAll().then((books) => setShelfBooks(books));
  }, [])

  const updateShelfBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then((shelvesBooks) => {
      if (shelf !== 'none') {
        book.shelf = shelf
        setShelfBooks(shelfBooks.filter(b => b.id !== book.id).concat([book]))
      } else {
        setShelfBooks(shelfBooks.filter(b => b.id !== book.id))
      }
    })
  }

  return (
    <div className="app">
      <Route exact path="/" render={
        () =>
          (<BookList shelfBooks={shelfBooks} shelves={shelves} updateShelfBooks={updateShelfBooks}></BookList>)
      }></Route>
      {<Route path="/search" render={
        () =>
          (<BookSearch shelfBooks={shelfBooks} shelves={shelves} updateShelfBooks={updateShelfBooks}></BookSearch>)
      }></Route>}
    </div>
  )
}

export default App
