
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, SentimentLabel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const performFullAnalysis = async (text: string): Promise<AnalysisResult> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following text and provide a structured NLP report: "${text}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "A concise summary of the text." },
          sentiment: {
            type: Type.OBJECT,
            properties: {
              label: { type: Type.STRING, enum: ["Positive", "Negative", "Neutral"] },
              score: { type: Type.NUMBER, description: "Sentiment intensity from 0 to 1." },
              explanation: { type: Type.STRING }
            },
            required: ["label", "score", "explanation"]
          },
          entities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING, description: "Category like Person, Org, Location, Product, Date." },
                relevance: { type: Type.NUMBER }
              },
              required: ["name", "type", "relevance"]
            }
          },
          keyphrases: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          readability: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              level: { type: Type.STRING },
              suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["score", "level", "suggestions"]
          },
          tone: {
            type: Type.OBJECT,
            properties: {
              primary: { type: Type.STRING },
              secondary: { type: Type.STRING },
              formalityScore: { type: Type.NUMBER }
            },
            required: ["primary", "secondary", "formalityScore"]
          },
          intent: { type: Type.STRING },
          language: { type: Type.STRING }
        },
        required: ["summary", "sentiment", "entities", "keyphrases", "readability", "tone", "intent", "language"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text);
    return result as AnalysisResult;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Invalid analysis result received from AI.");
  }
};
