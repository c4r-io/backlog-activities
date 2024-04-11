import OpenAI from "openai";

const apiKey = "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";

// Pass the API key when creating the OpenAI object
const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export const main = async ( previousMessages,newMessage) => {
  console.log("prev new messages ",previousMessages, newMessage)
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      ...previousMessages,
      newMessage
    ],
  });
  return response.choices[0];
};
