
import { GoogleGenAI, Type } from "@google/genai";
import { Diamond } from "../types";

// Always create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.
export const analyzeDiamondDeal = async (diamond: Diamond) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this diamond for a premium marketplace:
      Shape: ${diamond.shape}
      Carat: ${diamond.carat}
      Color: ${diamond.color}
      Clarity: ${diamond.clarity}
      Cut: ${diamond.cut}
      Price: $${diamond.price}
      Lab: ${diamond.lab}
      
      Provide a brief expert appraisal on why this is a good buy or what to look out for. Keep it under 100 words.`,
    });
    return response.text || "No analysis available.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "AI analysis currently unavailable. Please consult our human experts.";
  }
};

export const getMarketInsights = async (searchQuery: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 3 current market trends for ${searchQuery} diamonds in the global wholesale market. Include price trajectory and rarity notes.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              trend: { type: Type.STRING },
              impact: { type: Type.STRING },
              recommendation: { type: Type.STRING }
            },
            required: ["trend", "impact", "recommendation"]
          }
        }
      }
    });
    const text = response.text;
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return [];
  }
};
