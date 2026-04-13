import { useState } from 'react'
import { createBook } from '../services/bookServices'

const CreateBookModal = ({ onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    published_year: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const payload = {
        ...formData,
        published_year: Number(formData.published_year),
      }

      await createBook(payload)

      onCreated() // 🔁 refresh list
      onClose()   // ❌ close modal

    } catch (error) {
      console.error(error)
      alert("Failed to create book")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-md p-6 rounded-xl relative">

        <button
          onClick={onClose}
          className="absolute top-2 right-3"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Create Book</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <input
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <input
            type="number"
            name="published_year"
            placeholder="Year"
            value={formData.published_year}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? 'Saving...' : 'Create'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default CreateBookModal