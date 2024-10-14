import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserSignUpPage from '../pages/user/UserSignUpPage';
import ProjectDashBoardPage from '../pages/user/ProjectDashBoardPage';
import UserLoginPage from '../pages/user/UserLoginPage';
import StoryboardPage from '../pages/user/StoryboardPage';


function UserRouter() {
  return (
    <>
    <Routes>
        <Route path = '/signup' element = {<UserSignUpPage/>} />
        <Route path = '/login' element = {<UserLoginPage/>} />
        <Route path = '/dashboard' element = {<ProjectDashBoardPage/>} />
        <Route path= '/storyboard' element = {<StoryboardPage/>} />
      
    </Routes>
      
    </>
  )
}

export default UserRouter
