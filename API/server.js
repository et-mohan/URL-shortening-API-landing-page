const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Enable CORS (adjust origin as needed for production)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (optional, not used here but good to have)
app.use(express.urlencoded({ extended: true }));

app.post("/api/shorten", async (req, res) => {
  const { url } = req.body;

  console.log("Received URL:", url);

  // Validate input
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL is required and must be a string" });
  }

  // Optional: simple URL format validation (checks protocol)
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return res.status(400).json({ error: "URL must start with http:// or https://" });
  }

  try {
    // Prepare URL encoded form data
    const postData = new URLSearchParams({ url }).toString();
    console.log("Post data to CleanURI:", postData);

    // Send POST request to CleanURI API
    const response = await axios.post(
      "https://cleanuri.com/api/v1/shorten",
      postData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Forward CleanURI API response to client
    res.json(response.data);
  } catch (err) {
    console.error("Axios error response data:", err.response?.data || err.message);
    res.status(500).json({ error: "Server error while shortening URL" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
