'use client';

import { useState } from 'react';
import { type ModelMessage } from 'ai';

export default function TextGeneration() {
  const [model, setModel] = useState('alias-code');
  const [messages, setMessages] = useState<ModelMessage[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    const newMessages: ModelMessage[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const response = await fetch('/api/text-generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: input,
        model,
      }),
    });

    if (!response.body) {
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let fullResponse = '';
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      const chunkValue = decoder.decode(value);
      fullResponse += chunkValue;
      setMessages([...newMessages, { role: 'assistant', content: fullResponse }]);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="flex justify-between items-center mb-4">
        <label htmlFor="model-select" className="text-sm">Model:</label>
        <select
          id="model-select"
          value={model}
          onChange={e => setModel(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="alias-code">alias-code (Coding)</option>
          <option value="alias-large">alias-large (Planning)</option>
          <option value="alias-fast">alias-fast (Utility)</option>
          <option value="alias-huge">alias-huge (Codebase Q&A)</option>
        </select>
      </div>
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((m, i) => (
          <div key={i} className="whitespace-pre-wrap p-4 border-b border-gray-200">
            <strong>{m.role === 'user' ? 'User: ' : 'AI: '}</strong>
            {m.content as string}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex-shrink-0">
        <input
          className="w-full max-w-md p-2 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
