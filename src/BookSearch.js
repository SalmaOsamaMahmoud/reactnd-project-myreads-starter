import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookSearch extends Component {
  state = {
    search: '',
    filteredBooks: []
  }

  abortController = null;

  handleChange = async (event) => {
    this.setState({ search: event.target.value })
    if (this.abortController) {
      this.abortController.abort()
    }
    if (event.target.value !== '') {
      this.abortController = new AbortController()
      const booksRes = await BooksAPI.search(event.target.value, this.abortController.signal)
      if (!booksRes.error) {
        this.setState({ filteredBooks: booksRes })
      } else {
        this.setState({ filteredBooks: [] })
      }
    }
    else {
      this.setState({ filteredBooks: [] })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.search} onChange={this.handleChange} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.filteredBooks.map((book) => (
                <li key={book.id}>
                  <Book book={book} bookshelves={this.props.bookshelves} shelfBooks={this.props.shelfBooks} updateShelfBooks={this.props.updateShelfBooks}></Book>
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

BookSearch.propTypes = {
  shelfBooks: PropTypes.array.isRequired,
  bookshelves: PropTypes.array.isRequired,
  updateShelfBooks: PropTypes.func.isRequired
}

export default BookSearch