// src/services/gemini.ts
import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the new GenAI client
const genAI = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number; // Index of correct option
    explanation: string;
    timestamp: number; // Simulated timestamp in seconds
}

export interface MissionContent {
    briefing: string;
    objectives: string[];
    questions: Question[];
}

export const generateMissionBriefing = async (videoTitle: string, videoDescription: string): Promise<MissionContent> => {
    if (!genAI) {
        throw new Error("Gemini AI client not initialized (API Key missing)");
    }

    // Explicitly handle 429/404 errors with the new client
    try {
        const prompt = `
        You are the AI Commander of the EngageX learning platform. 
        Users are "Cadets" turning YouTube videos into "Learning Missions".
        
        Analyze this video metadata:
        Title: ${videoTitle}
        Description: ${videoDescription.substring(0, 500)}...

        Generate a JSON response with:
        1. "briefing": A short, sci-fi military style mission briefing summary (max 2 sentences).
        2. "objectives": An array of 3 key learning objectives (short bullet points).
        3. "questions": An array of 3 multiple-choice questions to test understanding.
            - Each question should have:
            - "text": The question string.
            - "options": Array of 4 possible answers.
            - "correctAnswer": Index (0-3) of the correct answer.
            - "explanation": Brief explanation of why it's correct.
            - "timestamp": A suggested timestamp (in seconds) where this question should appear. Distribute them evenly (e.g., 30, 60, 90).

        Format: JSON only. Ensure there are NO trailing commas in arrays or objects.
        `;

        // The new SDK syntax for content generation
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json" // Native JSON support in newer models
            }
        });

        // Access response text - it's a getter property in the new SDK
        const text = response.text || "";


        // Clean markdown and common JSON issues
        let jsonString = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .replace(/,\s*([}\]])/g, "$1") // Remove trailing commas before closing braces/brackets
            .trim();

        let data;
        try {
            data = JSON.parse(jsonString);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            console.error("Failed to parse (first 500 chars):", jsonString.substring(0, 500));
            throw new Error(`Failed to parse Gemini response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
        }

        // Ensure questions have IDs
        const questionsWithIds = data.questions?.map((q: any, i: number) => ({
            ...q,
            id: `q-${i}-${Date.now()}`,
            timestamp: q.timestamp || (30 * (i + 1)) // Fallback timestamps
        })) || [];

        return {
            ...data,
            questions: questionsWithIds
        };

    } catch (error: any) {
        console.error("Gemini Generation Error:", error);

        // Specific handling for Quota/Rate Limit (429)
        if (error.status === 429 || (error.message && error.message.includes("429"))) {
            console.warn("Quota exceeded. Returning fallback content.");
        }

        // Fallback content
        return {
            briefing: "Uplink unstable (Rate Limit/Connection Error). Proceed with manual analysis of visual data.",
            objectives: ["Analyze video content", "Extract key data points", "Complete verification"],
            questions: [
                {
                    id: "fallback-1",
                    text: "What is the primary objective of this mission?",
                    options: ["Analyze Data", "Ignore Data", "Delete Data", "Corrupt Data"],
                    correctAnswer: 0,
                    explanation: "Data analysis is critical for mission success.",
                    timestamp: 30
                },
                {
                    id: "fallback-2",
                    text: "Which verification protocol should be followed?",
                    options: ["Skip verification", "Double-check sources", "Guess randomly", "Ask a friend"],
                    correctAnswer: 1,
                    explanation: "Double-checking sources ensures data integrity and mission accuracy.",
                    timestamp: 60
                },
                {
                    id: "fallback-3",
                    text: "Confirm current mission status:",
                    options: ["Failed", "Aborted", "Pending", "Active"],
                    correctAnswer: 3,
                    explanation: "Mission is currently active and requires your full attention.",
                    timestamp: 90
                }
            ]
        };
    }
};