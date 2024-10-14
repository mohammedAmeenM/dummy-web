import React, { useState } from 'react';

function ImageGeneratorModal({ onClose }) {
  const [style, setStyle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Image Generator</h2>
        
        <div className="mb-4">
          <label htmlFor="style" className="block mb-2 flex justify-start">Style:</label>
          <input
            type="text"
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="prompt" className="block mb-2 flex justify-start">Prompt:</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="negativePrompt" className="block mb-2 flex justify-start">Negative Prompt:</label>
          <textarea
            id="negativePrompt"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mt-4 flex justify-end space-x-2">
        <button onClick={() => console.log('Generate')} className="bg-teal-600 text-white px-4 py-2 rounded">Generate</button>
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          
        </div>
      </div>
    </div>
  );
}

export default ImageGeneratorModal;