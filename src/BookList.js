import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

const BookList = props => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {
            props.bookshelves.filter(x => x.value !== 'none').map((bookshelf, index) => (
              <Bookshelf key={index} shelfBooks={props.shelfBooks} bookshelf={bookshelf}
                bookshelves={props.bookshelves} updateShelfBooks={props.updateShelfBooks}></Bookshelf>
            ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search"><button>Add a book</button></Link>
      </div>
    </div>
  )
}

BookList.propTypes = {
  shelfBooks: PropTypes.array.isRequired,
  bookshelves: PropTypes.array.isRequired,
  updateShelfBooks: PropTypes.func.isRequired
}

export default BookList
