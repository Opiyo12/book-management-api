import express from 'express';
import {createBookController,  getAllBooksController, getBookByIdController, deleteBookByIdController, updateBookController } from "../controller/book.controller.js";


const router=express.Router();
router.post('/', createBookController);
router.get('/', getAllBooksController);
router.get("/:id", getBookByIdController);
router.delete("/:id", deleteBookByIdController);
router.patch("/:id", updateBookController);
export default router;