// Import the 'express' module
import express from 'express';

import router from './routs/rots';




// Create an Express application
const app = express();

// Set the port number for the server
const port = 3000;

app.use(express.json());
app.use('/api',router);



// Define a route for the root path ('/')
app.get('/', (req, res) => {
  // Send a response to the client
  res.send('Hello, TypeScript + Node.js + Express!');
});






// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});


