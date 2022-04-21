import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

const BookList = props => {
  const { shelfBooks, shelves, updateShelfBooks } = props;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {
            shelves.filter(x => x.value !== 'none').map((bookshelf, index) => (
              <Bookshelf key={index} shelfBooks={shelfBooks} bookshelf={bookshelf}
                shelves={shelves} updateShelfBooks={updateShelfBooks}></Bookshelf>
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
  shelves: PropTypes.array.isRequired,
  updateShelfBooks: PropTypes.func.isRequired
}

export default BookList
