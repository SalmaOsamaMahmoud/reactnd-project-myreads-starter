import PropTypes from 'prop-types'
import React from 'react'
import Book from './Book'

const Bookshelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.bookshelf.name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        props.shelfBooks.filter(x => x.shelf === props.bookshelf.value).map((book) => (
                            <li key={book.id}>
                                <Book book={book} shelfBooks={props.shelfBooks} bookshelves={props.bookshelves} updateShelfBooks={props.updateShelfBooks}></Book>
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    )
}

Bookshelf.propTypes = {
    shelfBooks: PropTypes.array.isRequired,
    bookshelf: PropTypes.object.isRequired,
    bookshelves: PropTypes.array.isRequired,
    updateShelfBooks: PropTypes.func.isRequired
}

export default Bookshelf
