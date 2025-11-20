import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "";

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/chat", async (req, res) => {
  const message = req.body.message;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }]
        })
      }
    );

    const data = await response.json();

    console.log("Gemini Response:", data);

    const aiReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No reply from Gemini";

    res.json({ reply: aiReply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

