import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useFormik } from "formik";
import * as Yup from "yup";

import {  getDocs } from "firebase/firestore";
import ProjectModal from "./ProjectModal";
import StoryBoardModal from "./StoryBoardModal";


function ProjectDashboard() {
  const [projectModal, setProjectModal] = useState(false);
  const [storyBoardModal, setStoryBoardModal] = useState(false);

  const navigate = useNavigate();

 

  const [storyBoardName, setStoryBoardName] = useState("");
  const [storyBoardTemplate, setStoryBoardTemplate] = useState("");
  const [storyBoardFrame, setStoryBoardFrame] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectDetails, setProjectDetails] = useState([]);
  const [projectName, setProjectName] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);



  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const fetchedProjects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProjects(fetchedProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenProjectModal = () => setProjectModal(true);
  const handleCloseProjectModal = () => setProjectModal(false);

  const handleCreateProject = async () => {
    try {
      const newProjectRef = await addDoc(collection(db, "projects"), {
        projectName: projectName,
        projectDetails: projectDetails,
      });

      setProjects((prevProjects) => [
        ...prevProjects,
        { id: newProjectRef.id, projectName, projectDetails },
      ]);

      setProjectModal(false);
      setStoryBoardModal(true);
      fetchProjects();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleOpenStoryBoardModal = () => setStoryBoardModal(true);
  const handleCloseStoryBoardModal = () => setStoryBoardModal(false);

  const handleStoryboardCreate = async () => {
    try {
      await addDoc(collection(db, "storyboards"), {
        storyboardname: storyBoardName,
        template: storyBoardTemplate,
        frame: storyBoardFrame,
      });
      setStoryBoardModal(false);
      navigate("/storyboard");
    } catch (error) {
      console.log("Error adding document:", error);
    }
  };



 

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    console.log(option); 
    setIsDropdownOpen(false); 
  };

  return (
    <>

      <div className="relative min-h-80 w-full flex flex-col justify-center items-center my-6 bg-gradient-to-r from-emerald-100 to-blue-100 p-6">
        {/* User Profile Image Upload */}
        <div className="absolute top-4 right-4">
          <label htmlFor="profile-upload" className="cursor-pointer">
            <img
              src={profileImage || "default-profile.png"} 
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-teal-600 object-cover cursor-pointer"
              onClick={handleToggleDropdown} 
            />
           
          </label>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick('Plans and Pricing')}>Plans and Pricing</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick('Dashboard')}>Dashboard</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick('How to Use')}>How to Use</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick('Profile Details')}>Profile Details</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick('Feedback')}>Feedback</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleOptionClick('Logout')}>Logout</li>
              </ul>

            </div>
          )}
        </div>
        
        <h1 className="text-3xl font-bold text-sky-500 text-center my-5">My Projects</h1>


        <div className="relative w-full h-64 max-w-full bg-white shadow-sm border border-slate-200 rounded-lg p-6 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-cyan-600 text-center">
            Start Building Your Next Big Idea: Create a New Project
          </h2>
          <button
            className="mt-4 rounded-md bg-teal-600 py-2 px-4 text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-500 active:bg-teal-500"
            type="button"
            onClick={handleOpenProjectModal}
          >
            Create New Project
          </button>
        </div>

        {/* Displaying Fetched Projects */}
        <div className="w-full max-w-full my-4">
          <h3 className="text-xl font-semibold text-sky-600 mb-3 flex justify-start">Your Projects</h3>
          {projects.length > 0 ? (
            <ul className="space-y-4">
              {projects.map((project) => (
                <li key={project.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex flex-col items-start">
                  <h4 className="text-lg font-semibold text-cyan-600">{project.projectName}</h4>
                  <p className="text-sm text-gray-600 text-left">{project.projectDetails}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 flex justify-start">No projects available. Start by creating a new project!</p>
          )}
        </div>
      </div>

      <ProjectModal
        isOpen={projectModal}
        handleClose={handleCloseProjectModal}
        projectName={projectName}
        setProjectName={setProjectName}
        projectDetails={projectDetails}
        setProjectDetails={setProjectDetails}
        handleCreateProject={handleCreateProject}
      />

      <StoryBoardModal
        isOpen={storyBoardModal}
        handleClose={handleCloseStoryBoardModal}
        storyBoardName={storyBoardName}
        setStoryBoardName={setStoryBoardName}
        storyBoardTemplate={storyBoardTemplate}
        setStoryBoardTemplate={setStoryBoardTemplate}
        storyBoardFrame={storyBoardFrame}
        setStoryBoardFrame={setStoryBoardFrame}
        handleStoryboardCreate={handleStoryboardCreate}
      />

    </>
  );
}

export default ProjectDashboard;
