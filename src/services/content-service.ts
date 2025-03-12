import {  GoogleGenerativeAI, HarmBlockThreshold, HarmCategory} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY as string);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-pro-exp-02-05",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function run(input : string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const result = await chatSession.sendMessage(
    ` you  are a chatting person send someone sending a line of text line 10 to 12 words about this topic ${input} 
      just a brif and well explain it, only send the response not the fiter like okey here is the response of the quations`);
  return result.response.text();
}

