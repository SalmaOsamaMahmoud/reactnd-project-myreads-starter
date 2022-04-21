import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

const BookSearch = (props) => {
  const [search, setSearch] = useState('')
  const [filteredBooks, setfilteredBooks] = useState([])
  const { shelfBooks, shelves, updateShelfBooks } = props;
  let abortController = new AbortController();

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    abortController = new AbortController()
    searchBooks()
    return () => abortController.abort()
  }, [search]);

  const searchBooks = async () => {
    if (search !== '') {
      const booksRes = await BooksAPI.search(search, abortController.signal)
      if (!booksRes.error) {
        setfilteredBooks(booksRes)
      } else {
        setfilteredBooks([])
      }
    }
    else {
      setfilteredBooks([])
    }
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/"><button className="close-search">Close</button></Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" value={search} onChange={handleChange} />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {
            filteredBooks.map((book) => (
              <li key={book.id}>
                <Book book={book} shelves={shelves} shelfBooks={shelfBooks} updateShelfBooks={updateShelfBooks}></Book>
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  )
}

BookSearch.propTypes = {
  shelfBooks: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  updateShelfBooks: PropTypes.func.isRequired
}

export default BookSearch