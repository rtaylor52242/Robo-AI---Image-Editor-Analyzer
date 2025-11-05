
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Analyzes an image with a text prompt using gemini-2.5-flash.
 * @param image The image file to analyze.
 * @param prompt The text prompt for analysis.
 * @returns The text analysis from the model.
 */
export async function analyzeImage(image: File, prompt: string): Promise<string> {
  const imageBase64 = await fileToBase64(image);

  const imagePart = {
    inlineData: {
      mimeType: image.type,
      data: imageBase64,
    },
  };

  const textPart = {
    text: prompt,
  };

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, textPart] },
  });
  
  return response.text;
}

/**
 * Edits an image based on a text prompt using gemini-2.5-flash-image.
 * @param image The image file to edit.
 * @param prompt The text prompt describing the edit.
 * @returns A data URL for the edited image.
 */
export async function editImage(image: File, prompt: string): Promise<string> {
  const imageBase64 = await fileToBase64(image);
  
  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType: image.type,
    },
  };

  const textPart = {
    text: prompt,
  };

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [imagePart, textPart],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  // Find the first part that contains image data
  const imageResultPart = response.candidates?.[0]?.content?.parts?.find(
    (part) => part.inlineData?.mimeType.startsWith('image/')
  );

  if (imageResultPart && imageResultPart.inlineData) {
    const base64ImageBytes = imageResultPart.inlineData.data;
    const mimeType = imageResultPart.inlineData.mimeType;
    return `data:${mimeType};base64,${base64ImageBytes}`;
  } else {
    throw new Error('No image was generated in the response. The model may not have understood the prompt for image editing.');
  }
}


/**
 * Enhances an image's quality and resolution using gemini-2.5-flash-image.
 * @param image The image file to enhance.
 * @returns A data URL for the enhanced image.
 */
export async function enhanceImage(image: File): Promise<string> {
  const imageBase64 = await fileToBase64(image);
  
  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType: image.type,
    },
  };

  const textPart = {
    text: "Enhance the overall quality and resolution of the image. Increase sharpness, clarity, and detail. Correct any noise or blurriness. Do not change the content of the image.",
  };

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [imagePart, textPart],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  // Find the first part that contains image data
  const imageResultPart = response.candidates?.[0]?.content?.parts?.find(
    (part) => part.inlineData?.mimeType.startsWith('image/')
  );

  if (imageResultPart && imageResultPart.inlineData) {
    const base64ImageBytes = imageResultPart.inlineData.data;
    const mimeType = imageResultPart.inlineData.mimeType;
    return `data:${mimeType};base64,${base64ImageBytes}`;
  } else {
    throw new Error('No image was generated in the response. The model may have failed to enhance the image.');
  }
}
