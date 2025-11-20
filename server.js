import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyBrj8O8im7KAf03jfcWraSXUDL0DA2f-wM";

app.post("/chat", async (req, res) => {
    const message = req.body.message;

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + API_KEY,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: message }]
                        }
                    ]
                })
            }
        );

        const data = await response.json();
        console.log("Full Gemini response:", data);

        const aiReply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No reply from AI";

        res.json({ reply: aiReply });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ reply: "Server error" });
    }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
