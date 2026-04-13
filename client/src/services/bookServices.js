import apiInstance from "../api/apiInstance";

export async function fetchBooks() {
    try {
    const response = await apiInstance.get("/books");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

//getting book by id
export async function getBookById(id) {
  try {
    const response = await apiInstance.get(`/books/${id}`);
    return response.data.data || []; // always array;
  } catch (error) {
    console.error(`Error fetching book ${id}:`, error);
    return [];
  }
}
//create book
export async function createBook(bookData) {
  try {
    const response = await apiInstance.post("/books", bookData);
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
}
//delete book
export async function deleteBook(id) {
  try{
    const response = await apiInstance.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book ${id}:`, error);
    throw error;
  }
}