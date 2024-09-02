// File: app/hooks/useOpenAI.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // placehgolder for the api key
});

export const useOpenAI = () => {
  const openai = new OpenAIApi(configuration);

  return openai;
};
