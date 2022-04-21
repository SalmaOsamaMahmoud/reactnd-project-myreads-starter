import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Bookshelf = props => {
    const { shelfBooks, bookshelf, shelves, updateShelfBooks } = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{bookshelf.name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        shelfBooks.filter(x => x.shelf === bookshelf.value).map((book) => (
                            <li key={book.id}>
                                <Book book={book} shelfBooks={shelfBooks} shelves={shelves} updateShelfBooks={updateShelfBooks}></Book>
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
    shelves: PropTypes.array.isRequired,
    updateShelfBooks: PropTypes.func.isRequired
}

export default Bookshelf
