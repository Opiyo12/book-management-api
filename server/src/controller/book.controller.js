import { createBook ,getAllBooks, getBookById, deleteBook, updateBook} from "../services/book.service.js";

export const  createBookController=async(req,res, next)=>{
    
    try{
        const newBook=await createBook(bookData);
        res.status(201).json({
            message:"Book created successfully",
            data:newBook
        });
    }catch(error){
        next(error);
    }
}
//getting all books
export const getAllBooksController=async(req,res, next)=>{
    try{
        const books=await getAllBooks();
        if(!books){
            return res.status(404).json({
                message:"No books found"
            });
        }
        res.status(200).json({
            message:"Books retrieved successfully",
            data:books
        });
    }catch(error){
        next(error);
    }
}
//getting all books byId
export const getBookByIdController=async(req,res, next)=>{
   
    try{
         const{id}=req.params;
        const book = await getBookById(id);
        if(!book){
            return res.status(404).json({
                message:"Book not found"
            });
        }
        res.status(200).json({
            message:"Book retrieved successfully",
            data:book
        });
    }catch(error){
        next(error);
    }
}
//deleting all the books by id
export const deleteBookByIdController= async(req, res, next)=>{
 try{
    const{id}=req.params;
    const result= await deleteBook(id);
    if(!result){
        res.status(404).json({
            message:"No book found"
        });
    }
    res.status(200).json({
        message:"Book Successfully deleted",
        data: result
    });
 }catch(error){
    res.status(500).json({ message: error.message });
 }
}
//updating book by id
export const updateBookController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await updateBook({
      id,
      ...req.body
    });

    res.status(200).json({
      message: "Book updated successfully",
      data: result
    });

  } catch (error) {
    next(error);
  }
};