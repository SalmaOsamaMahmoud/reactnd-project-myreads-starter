import React from 'react'
import './App.css'
import BookList from './BookList'
import { Route } from 'react-router-dom'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'
class BooksApp extends React.Component {
  state = {
    shelfBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        shelfBooks: books
      })
    });
  }

  bookshelves = [
    { value: 'currentlyReading', name: 'Currently Reading' },
    { value: 'wantToRead', name: 'Want to Read' },
    { value: 'read', name: 'Read' },
    { value: 'none', name: 'None' },
  ]

  updateShelfBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then((bookshelvesBooks) => {
      this.setState((prevState) => {
        const books = [...prevState.shelfBooks]
        const index = books.findIndex(x => x.id === book.id)
        if (index !== -1) {
          const updatedBook = books[index]
          books.splice(index, 1)
          if (shelf !== 'none') {
            updatedBook.shelf = shelf
            books.push(updatedBook)
          }
        } else {
          book.shelf = shelf
          books.push(book)
        }
        return {
          shelfBooks: books
        }
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={
          () =>
            (<BookList shelfBooks={this.state.shelfBooks} bookshelves={this.bookshelves} updateShelfBooks={this.updateShelfBooks.bind(this)}></BookList>)
        }></Route>
        {<Route path="/search" render={
          () =>
            (<BookSearch shelfBooks={this.state.shelfBooks} bookshelves={this.bookshelves} updateShelfBooks={this.updateShelfBooks.bind(this)}></BookSearch>)
        }></Route>}
      </div>
    )
  }
}

export default BooksApp
