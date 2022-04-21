import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Book = props => {
  const { shelves, book, shelfBooks, updateShelfBooks } = props;
  const [shelf, setShelf] = useState('')

  useEffect(() => {
    setShelf(findShelf(book.id))
  })

  const findShelf = (bookId) => {
    const bookItem = shelfBooks.find(x => x.id === bookId);
    if (bookItem) {
      return bookItem.shelf
    }
    return 'none'
  }

  const handleChange = (e) => {
    setShelf(e.target.value)
    updateShelfBooks(book, e.target.value)
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + (book.imageLinks && book.imageLinks.thumbnail) + ')' }}></div>
        <div className="book-shelf-changer">
          <select value={shelf} onChange={handleChange}>
            <option value="move" disabled>Move to...</option>
            {shelves.map((shelfItem, index) => (<option key={index} value={shelfItem.value}>{shelfItem.name}</option>))}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors && book.authors.map((author, index) => (<div key={index} className="book-authors">{author}</div>))}
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelfBooks: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  updateShelfBooks: PropTypes.func.isRequired
}

export default Book