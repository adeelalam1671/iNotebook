// Import dependencies
const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

// Connect to MongoDB
connectToMongo();

// Create express app
const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());



app.use(cors())
// Available Routes
app.use('/api/auth', require('./routes/auth'));   // ✅ Auth route (must export router)
app.use('/api/notes', require('./routes/notes')); // ✅ Notes route (must export router)

// Start server
app.listen(port, () => {
  console.log(`inotebook backend listening at http://localhost:${port}`);
  console.log("Connected to Mongo Successfully");
});
