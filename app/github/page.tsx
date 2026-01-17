'use client';

import { useState } from 'react';

export default function GitHubUpload() {
  const [repo, setRepo] = useState('');
  const [branch, setBranch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleUpload = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setAiResponse(null);

    const response = await fetch('/api/github-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repo, branch }),
    });

    const result = await response.json();

    setLoading(false);

    if (response.ok) {
      setSuccess(result.message);
    } else {
      setError(result.error);
    }
  };

  const getAiHelp = async () => {
    if (!error) return;

    setAiLoading(true);
    setAiResponse(null);

    const response = await fetch('/api/text-generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `I encountered the following error while trying to upload to GitHub: "${error}". Please help me understand and resolve this issue.`,
        model: 'alias-fast', // Or any other suitable model
      }),
    });

    if (!response.body) {
      setAiLoading(false);
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
      setAiResponse(fullResponse);
    }

    setAiLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-8">
          Upload to GitHub
        </h1>

        <div className="w-full max-w-xs">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repo">
              Repository Name (e.g., your-username/your-repo)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="repo"
              type="text"
              placeholder="your-username/your-repo"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="branch">
              Branch
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="branch"
              type="text"
              placeholder="main"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>

          {error && (
            <div className="mt-4 text-red-500">
              <p>Upload failed:</p>
              <p>{error}</p>
              <button
                className="mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={getAiHelp}
                disabled={aiLoading}
              >
                {aiLoading ? 'Getting help...' : 'Get help from AI assistant'}
              </button>
            </div>
          )}

          {aiResponse && (
            <div className="mt-4 p-4 border rounded bg-gray-100 text-left">
              <h3 className="font-bold mb-2">AI Assistant says:</h3>
              <p>{aiResponse}</p>
            </div>
          )}

          {success && (
            <div className="mt-4 text-green-500">
              <p>{success}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
