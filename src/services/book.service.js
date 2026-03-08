import database from "../config/database.js";
import AppError from "../utils/appError.js";

// Create book
export const createBook = async (bookData) => {
    const { title, author, category, published_year } = bookData;

    if (!title || !author || !category || !published_year) {
        throw new AppError("All fields are required", 400);
    }

    const [result] = await database.execute(
        "INSERT INTO books (title, author, category, published_year) VALUES (?, ?, ?, ?)",
        [title, author, category, published_year]
    );

    return { id: result.insertId, ...bookData };
};

// Get all books
export const getAllBooks = async () => {
    const [rows] = await database.execute("SELECT * FROM books");
    if(rows.length===0){
        throw new AppError("No books found",404);
    }
    return rows;
};
//get books by id

export const getBookById = async(id)=>{
    const[rows]= await database.execute("SELECT * FROM books WHERE id=?",[id]);
    if(rows.length===0){
        throw new AppError("Book not found",404);
    }
    return rows[0];
     
}
//delete book
export const deleteBook=async(id)=>{
    const[result]= await database.execute("DELETE FROM books WHERE id=?",[id]);
    if(result.affectedRows===0){
        throw new AppError("The selected book is not  found", 404);
    }

 return {message:"Book Deleted successfully"}
    
}
export const updateBook = async (book) => {
  const { id, title, author, category, published_year } = book;

  const [result] = await database.execute(
    "UPDATE books SET title=?, author=?, category=?, published_year=? WHERE id=?",
    [
      title,
      author,
      category,
      published_year,
      id
    ]
  );

  if (result.affectedRows === 0) {
    throw new AppError("Book not found", 404);
  }

  return { message: "Book updated successfully" };
};