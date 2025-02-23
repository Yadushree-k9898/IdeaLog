
// import mongoose from 'mongoose';

// const noteSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   image: { type: String }, // For image uploads
//   audio: { type: String }, // For audio uploads
// }, { timestamps: true });

// const Note = mongoose.model('Note', noteSchema);

// export default Note;


import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // Image URL for uploaded files
    audio: { type: String }, // Audio URL for uploaded files
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
