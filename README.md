# VoiceNotes - A Note-Taking Web App

VoiceNotes is a web-based note-taking application that allows users to create, edit, search, and manage notes using text and voice input. The app leverages **React.js** for the frontend, **MongoDB** for data storage, **JWT authentication**, and the **Browser Web Speech API** for voice transcription.

## Features
- **Text & Voice Input**: Users can type or dictate notes using voice input.
- **Speech-to-Text Transcription**: Utilizes the Web Speech API to convert spoken words into text.
- **User Authentication**: Secure login and registration using JWT.
- **CRUD Operations**: Create, edit, delete, and search notes easily.
- **Responsive UI**: Built using React.js with a user-friendly and mobile-responsive design.
- **Search Functionality**: Find notes quickly using a search bar.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Lucide React Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)
- **Speech Recognition**: Web Speech API

## Folder Structure

### Frontend
```
│   App.css
│   App.jsx
│   index.css
│   main.jsx
│
├───api
│       authApi.js
│       notesApi.js
│
├───components
│   │   Navbar.jsx
│   │   NoteCard.jsx
│   │   NoteModal.jsx
│   │   PrivateRoute.jsx
│   │   Recorder.jsx
│   │   SearchBar.jsx
│   │   Sidebar.jsx
│   │   
│   └───ui
│           button.jsx
│
├───features
│   ├───auth
│   │       authSlice.js
│   │       authThunk.js
│   │
│   └───notes
│           notesSlice.js
│           notesThunks.js
│
├───hooks
│       useAuth.js
│       useNotes.js
│
├───lib
│       utils.js
│
├───pages
│       Dashboard.jsx
│       Home.jsx
│       Login.jsx
│       Signup.jsx
│       
├───store
│       store.js
│       zustandStore.js
│
└───utils
        authUtils.js
        recorderUtils.js
```

### Backend
```
│   app.js
│   server.js
│   swagger.js
│
├───config
│       db.js
│
├───controllers
│       authController.js
│       noteController.js
│
├───middleware
│       authMiddleware.js
│       errorMiddleware.js
│       uploadMiddleware.js
│
├───models
│       Note.js
│       User.js
│
├───routes
│       authRoutes.js
│       noteRoutes.js
│
├───test
│       auth.test.js
│       notes.test.js
│
└───utils
        generateToken.js
        upload.js
```

## Installation & Setup
1. **Clone the Repository**:
   ```sh
   git clone https://github.com/your-username/voicenotes.git
   cd voicenotes
   ```
2. **Install Dependencies**:
   ```sh
   npm install
   ```
3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. **Run the Backend**:
   ```sh
   npm run server
   ```
5. **Run the Frontend**:
   ```sh
   npm start
   ```

## Usage
1. **Sign Up / Log In** to create and manage your notes.
2. **Create a New Note** by typing or using the voice input feature.
3. **Edit or Delete Notes** from the dashboard.
4. **Search for Notes** using the search bar.

## Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries or contributions, reach out via **kyadushree47@gmail.com**.

