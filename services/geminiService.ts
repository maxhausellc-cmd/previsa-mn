import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Needs to be provided by environment
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (
  message: string,
  language: 'mn' | 'en'
): Promise<string> => {
  if (!apiKey) {
    return language === 'mn' 
      ? "Системийн алдаа: API түлхүүр тохируулагдаагүй байна." 
      : "System Error: API key not configured.";
  }

  try {
    const model = "gemini-2.5-flash";
    const systemPrompt = language === 'mn' 
      ? "Та бол PreVisa MN компанийн Японы визний мэргэшсэн зөвлөх юм. Та Монгол иргэдэд Япон руу аялах, ажиллах, сурах виз мэдүүлэхэд тусалдаг. Хариулт товч, ойлгомжтой, найрсаг байх ёстой."
      : "You are an expert Japanese Visa Consultant for PreVisa MN. You assist Mongolian citizens in applying for travel, work, and student visas to Japan. Keep answers concise, clear, and friendly.";

    const response = await ai.models.generateContent({
      model: model,
      contents: message,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return response.text || (language === 'mn' ? "Уучлаарай, би хариулж чадсангүй." : "Sorry, I couldn't generate a response.");
  } catch (error) {
    console.error("Gemini Error:", error);
    return language === 'mn' 
      ? "Холболтын алдаа гарлаа. Дахин оролдоно уу." 
      : "Connection error. Please try again.";
  }
};