import express from 'express';
import {createBookController,  getAllBooksController, getBookByIdController, deleteBookByIdController, updateBookController } from "../controller/book.controller.js";
import { protect } from '../middleware/authMiddleware.js';


const router=express.Router();
router.post('/', protect,createBookController);
router.get('/', protect, getAllBooksController);
router.get("/:id", protect, getBookByIdController);
router.delete("/:id", protect, deleteBookByIdController);
router.patch("/:id", protect, updateBookController);
export default router