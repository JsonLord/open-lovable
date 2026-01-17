'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';

export default function TextGeneration() {
  const [model, setModel] = useState('alias-code');
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/text-generation',
    body: {
      model,
    },
  });
  
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
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap p-4 border-b border-gray-200">
            <strong>{m.role === 'user' ? 'User: ' : 'AI: '}</strong>
            {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex-shrink-0">
        <input
          className="w-full max-w-md p-2 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
