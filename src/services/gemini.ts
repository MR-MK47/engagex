import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(API_KEY);

export interface MissionContent {
    briefing: string;
    objectives: string[];
    // Future: questions, etc.
}

export const generateMissionBriefing = async (videoTitle: string, videoDescription: string): Promise<MissionContent> => {
    if (!API_KEY) {
        throw new Error("Gemini API Key missing");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    You are the AI Commander of the EngageX learning platform. 
    Users are "Cadets" turning YouTube videos into "Learning Missions".
    
    Analyze this video metadata:
    Title: ${videoTitle}
    Description: ${videoDescription.substring(0, 500)}...

    Generate a JSON response with:
    1. "briefing": A short, sci-fi military style mission briefing summary (max 2 sentences).
    2. "objectives": An array of 3 key learning objectives (short bullet points).

    Format: JSON only.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Clean markdown code blocks if present
        const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Gemini Generation Error:", error);
        // Fallback content
        return {
            briefing: "Uplink unstable. Proceed with manual analysis of visual data.",
            objectives: ["Analyze video content", "Extract key data points", "Complete verification"]
        };
    }
};
