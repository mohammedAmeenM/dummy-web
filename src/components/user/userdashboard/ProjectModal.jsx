import React, { useState } from "react";

const ProjectModal = ({
  isOpen,
  handleClose,
  projectName,
  setProjectName,
  projectDetails,
  setProjectDetails,
  handleCreateProject,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative min-h-80 w-full max-w-lg bg-white shadow-sm border border-slate-200 rounded-lg p-6">
        <div className="text-center">
          <h5 className="text-slate-800 text-2xl font-semibold mb-4">
            Create New Project
          </h5>
          <p className="text-slate-600 mb-4">Enter your project details below:</p>
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border border-slate-300 rounded-md p-2 mb-4 w-full"
          />
          <textarea
            placeholder="Project Description"
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            className="border border-slate-300 rounded-md p-2 mb-4 w-full"
            rows="4"
          />
          <div className="flex justify-center">
            <button
              className="min-w-32 rounded-md bg-teal-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-500 focus:shadow-none active:bg-blue-500 mr-2"
              type="button"
              onClick={handleCreateProject}
            >
              Create
            </button>
            <button
              className="min-w-32 rounded-md bg-gray-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-gray-300 focus:shadow-none active:bg-gray-300"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
