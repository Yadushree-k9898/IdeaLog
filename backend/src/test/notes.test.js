import request from 'supertest';
import app from '../server.js'; // Ensure your server exports the Express app
import mongoose from 'mongoose';
import Note from '../models/Note.js';

// Dummy JWT token for testing (adjust according to your auth setup)
const TEST_TOKEN = 'YOUR_TEST_JWT_TOKEN';

describe('Notes API', () => {
  let noteId;

  // Clean up database before tests
  beforeAll(async () => {
    // Connect to a test DB or clear existing notes for the test user
    await Note.deleteMany({});
  });

  // Test creating a new note
  it('should create a new note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .field('title', 'Test Note')
      .field('content', 'This is a test note.');
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    noteId = res.body._id;
  });

  // Test retrieving all notes for the user
  it('should get all notes for the authenticated user', async () => {
    const res = await request(app)
      .get('/api/notes')
      .set('Authorization', `Bearer ${TEST_TOKEN}`);
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test retrieving a note by ID
  it('should get a note by its ID', async () => {
    const res = await request(app)
      .get(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${TEST_TOKEN}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', noteId);
  });

  // Test updating a note
  it('should update a note', async () => {
    const res = await request(app)
      .put(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .send({ title: 'Updated Test Note', content: 'Updated content' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Test Note');
  });

  // Test unauthorized access for update (edge case)
  it('should not update note if unauthorized', async () => {
    const res = await request(app)
      .put(`/api/notes/${noteId}`)
      .set('Authorization', 'Bearer INVALID_TOKEN')
      .send({ title: 'Hacked Note' });
    
    expect(res.statusCode).toEqual(401);
  });

  // Test deleting a note
  it('should delete a note', async () => {
    const res = await request(app)
      .delete(`/api/notes/${noteId}`)
      .set('Authorization', `Bearer ${TEST_TOKEN}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Note deleted successfully');
  });

  // Test error scenario: deleting non-existent note
  it('should return 404 when deleting a non-existent note', async () => {
    const res = await request(app)
      .delete(`/api/notes/${mongoose.Types.ObjectId()}`)
      .set('Authorization', `Bearer ${TEST_TOKEN}`);
    
    expect(res.statusCode).toEqual(404);
  });
});
