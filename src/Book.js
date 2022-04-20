import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      bookshelf: this.findShelf(this.props.book.id)
    }
  }

  findShelf = (bookId) => {
    const book = this.props.shelfBooks.find(x => x.id === bookId);
    if (book) {
      return book.shelf
    }
    return 'none'
  }

  handleChange = (e) => {
    this.setState({ bookshelf: e.target.value });
    this.props.updateShelfBooks(this.props.book, e.target.value)
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + (this.props.book.imageLinks && this.props.book.imageLinks.thumbnail) + ')' }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.bookshelf} onChange={this.handleChange}>
              <option value="move" disabled>Move to...</option>
              {this.props.bookshelves.map((bookshelf, index) => (<option key={index} value={bookshelf.value}>{bookshelf.name}</option>))}
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        {this.props.book.authors && this.props.book.authors.map((author, index) => (<div key={index} className="book-authors">{author}</div>))}
      </div>
    )
  }
}

Book.propTypes = {
  shelfBooks: PropTypes.array.isRequired,
  bookshelves: PropTypes.array.isRequired,
  updateShelfBooks: PropTypes.func.isRequired
}

export default Book