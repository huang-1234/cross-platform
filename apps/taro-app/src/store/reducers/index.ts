import { combineReducers } from 'redux'
import bookshelf from './bookshelf'
import reader from './reader'

export default combineReducers({
  bookshelf,
  reader
})
