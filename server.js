const dotenv = require("dotenv");
const mongoose = require("mongoose"); 
const app = require('./app');

// Create an instance of express

dotenv.config({ path: "./.env" });

// Define the port to run the server on
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose
  .connect(process.env.DATABASE_CONN_STRING, {})
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
