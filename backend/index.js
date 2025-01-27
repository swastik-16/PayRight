const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const app = express();

// Set the port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route for root (/) to confirm server is listening
app.get("/", (req, res) => {
    res.json({ message: "Listening successfully" });
    console.log("Listening successfully");
});

// Use the root router for API routes
app.use("/api/v1", rootRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
