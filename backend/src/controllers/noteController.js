import Note from "../models/Note.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import fs from "fs";

// 🟢 Get All Notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 🟢 Create Note (supports text, image, and audio uploads)
export const createNote = async (req, res) => {
  // Validate incoming data using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { title, content } = req.body;
  let image = null;
  let audio = null;

  // Check for uploaded files under 'audio' and 'image'
  if (req.files) {
    if (req.files.audio && req.files.audio.length > 0) {
      audio = req.files.audio[0].path;
    }
    if (req.files.image && req.files.image.length > 0) {
      image = req.files.image[0].path;
    }
  }

  try {
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    title = title.trim().toLowerCase();
    content = content.trim();

    // Optionally, check for duplicate notes for this user
    const existingNote = await Note.findOne({ user: req.user.id, title, content });
    if (existingNote) {
      return res.status(400).json({ message: "Note already exists" });
    }

    // Create the new note with optional image and audio fields
    const note = await Note.create({ user: req.user.id, title, content, image, audio });
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// 🟢 Get Note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 🟠 Update a Note
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔴 Delete a Note (optionally, delete associated files here)
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Delete associated image file if it exists
    if (note.image) {
      fs.unlink(note.image, (err) => {
        if (err) {
          console.error("Failed to delete image file:", err);
        } else {
          console.log("Image file deleted successfully");
        }
      });
    }

    // Delete associated audio file if it exists
    if (note.audio) {
      fs.unlink(note.audio, (err) => {
        if (err) {
          console.error("Failed to delete audio file:", err);
        } else {
          console.log("Audio file deleted successfully");
        }
      });
    }

    await note.deleteOne();
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}; 
// 🔍 Search Notes
export const searchNotes = async (req, res, next) => {
  try {
    if (!req.query.keyword) {
      return res.status(400).json({ message: "Keyword is required" });
    }

    const keyword = { title: { $regex: req.query.keyword, $options: "i" } };
    const notes = await Note.find({ user: req.user.id, ...keyword });
    res.json(notes);
  } catch (error) {
    console.error("Error in searchNotes:", error);
    next(error);
  }
};
