import { useEffect, useState } from 'react'
import { fetchBooks, deleteBook } from '../services/bookServices'

const BookList = ({ refresh, searchTerm, onDelete }) => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const loadBooks = async () => {
      const res = await fetchBooks()
      setBooks(res?.data || [])
    }

    loadBooks()
  }, [refresh]) // 🔥 THIS FIXES YOUR ISSUE

  const handleDelete = async (id) => {
    await deleteBook(id)
    onDelete() // refresh list
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (filteredBooks.length === 0) {
    return <p className="text-gray-500">No books found</p>
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">

      {filteredBooks.map((book) => (
        <div
          key={book._id}
          className="p-4 border rounded-lg shadow"
        >
          <h3 className="font-bold text-lg">{book.title}</h3>
          <p>{book.author}</p>
          <p className="text-sm text-gray-500">
            {book.category} • {book.published_year}
          </p>

          <button
            onClick={() => handleDelete(book._id)}
            className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  )
}

export default BookList