const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/dist/frontend")));

// API Routes
app.use('/api', routes);

// Serve Angular Frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/frontend/browser/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));