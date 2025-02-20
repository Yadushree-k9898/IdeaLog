/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         image:
 *           type: string
 *           description: URL or path of the uploaded image
 *         audio:
 *           type: string
 *           description: URL or path of the uploaded audio
 *         user:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * tags:
 *   - name: Notes
 *     description: API for managing notes
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Retrieve all notes for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of notes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               audio:
 *                 type: string
 *                 format: binary
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Note created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Retrieve a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID.
 *     responses:
 *       200:
 *         description: The note data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *   put:
 *     summary: Update a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated note.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The note ID.
 *     responses:
 *       200:
 *         description: Note deleted successfully.
 *
 * @swagger
 * /notes/search:
 *   get:
 *     summary: Search notes by title keyword
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *         description: The keyword to search for.
 *     responses:
 *       200:
 *         description: A list of matching notes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */

import express from 'express';
import { 
  getNotes, 
  createNote, 
  getNoteById, 
  updateNote, 
  deleteNote, 
  searchNotes 
} from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';
import { check } from 'express-validator';

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Files are saved in the 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Configure Multer to accept audio and image files
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("audio/") || file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only audio and image files are allowed"), false);
    }
  }
});

const router = express.Router();

// Routes
router.route('/')
  .get(protect, getNotes)
  .post(
    protect,
    upload.fields([
      { name: 'audio', maxCount: 1 },
      { name: 'image', maxCount: 1 }
    ]),
    [
      check('title').notEmpty().withMessage('Title is required').trim().escape(),
      check('content').notEmpty().withMessage('Content is required').trim().escape()
    ],
    createNote
  );

router.route('/:id')
  .get(protect, getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

router.get('/search', protect, searchNotes);

export default router;
