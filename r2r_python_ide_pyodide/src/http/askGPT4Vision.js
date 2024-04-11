import { Configuration, OpenAIApi } from "openai"

// Initialize the API client with your API key
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function askGPT4Vision(question, base64Image, parentMessageId = null) {
  try {
    const response = await openai.createCompletion({
      model: "gpt-4-vision-preview", // Use the appropriate model for vision tasks
      prompt: question,
      temperature: 0.5,
      max_tokens: 100,
      // Include the base64 image data within the request
      attachments: [{
        data: base64Image,
        mime_type: "image/jpeg"
      }],
      // If parent_message_id is provided, include it in the request
      ...(parentMessageId && { parent_message_id: parentMessageId }),
    });

    console.log(response.data.choices[0].text);
  } catch (error) {
    console.error("Error during API call:", error);
  }
}

// // Example usage
// const question = "Describe what is happening in this image and provide a summary.";
// const base64Image = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."; // Truncated for example
// const parentMessageId = 'yourParentMessageIdHere'; // Assuming you have a parent message ID

// askGPT4Vision(question, base64Image, parentMessageId);
