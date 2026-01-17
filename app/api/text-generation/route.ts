import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// Create an OpenAI API client (that's edge friendly!)
const customOpenAI = createOpenAI({
  apiKey: process.env.HELMHOLTZ_API_KEY || '',
  baseURL: 'https://api.helmholtz-blablador.fz-juelich.de/v1',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt, model } = await req.json();

  const result = await streamText({
    model: customOpenAI(model || 'alias-code'),
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  return result.toTextStreamResponse();
}
