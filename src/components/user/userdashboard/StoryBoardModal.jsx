import React from "react";

const StoryBoardModal = ({
  isOpen,
  handleClose,
  storyBoardName,
  setStoryBoardName,
  storyBoardTemplate,
  setStoryBoardTemplate,
  storyBoardFrame,
  setStoryBoardFrame,
  handleStoryboardCreate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative min-h-80 w-full max-w-lg bg-white shadow-sm border border-slate-200 rounded-lg p-6">
        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
          New Storyboard
        </h1>
        <label htmlFor="name" className="mb-5 text-gray-800 text-sm font-bold leading-tight tracking-normal flex justify-start">
          Storyboard Name
        </label>
        <input
          id="name"
          value={storyBoardName}
          onChange={(e) => setStoryBoardName(e.target.value)}
          className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          placeholder="Enter your Storyboard name"
        />
        <label htmlFor="template" className="mb-5 text-gray-800 text-sm font-bold leading-tight tracking-normal flex justify-start">
          Template
        </label>
        <select
          id="template"
          value={storyBoardTemplate}
          onChange={(e) => setStoryBoardTemplate(e.target.value)}
          className="mb-5 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        >
          <option value="" disabled selected>
            Select a template
          </option>
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
          <option value="template3">Template 3</option>
        </select>
        <label htmlFor="framesize" className="mb-5 text-gray-800 text-sm font-bold leading-tight tracking-normal flex justify-start">
          Frame Size
        </label>
        <select
          id="framesize"
          value={storyBoardFrame}
          onChange={(e) => setStoryBoardFrame(e.target.value)}
          className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
        >
          <option value="" disabled selected>
            Select a frame
          </option>
          <option value="frame1">Frame 1</option>
          <option value="frame2">Frame 2</option>
          <option value="frame3">Frame 3</option>
        </select>
        <div className="flex justify-start">
          <button
            onClick={handleStoryboardCreate}
            className="bg-teal-600 rounded text-white px-8 py-2 text-sm hover:bg-teal-700 transition duration-150 ease-in-out"
          >
            Submit
          </button>
          <button
            className="ml-3 bg-gray-100 text-gray-600 px-8 py-2 text-sm border rounded hover:bg-gray-300 transition duration-150"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryBoardModal;
