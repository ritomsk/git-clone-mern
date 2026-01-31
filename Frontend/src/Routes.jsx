import { useNavigate, useRoutes } from "react-router-dom";
import { useAuth } from './AuthContext.jsx';
import { useEffect } from "react";

import  Dashboard  from './componenets/dashboard/dashboard.jsx';
import  Login  from './componenets/auth/Login.jsx';
import  Signup  from './componenets/auth/Signup.jsx';
import  Profile  from './componenets/user/Profile.jsx';
import CreateRepo from "./componenets/repo/CreateRepo.jsx";
import ShowRepo from './componenets/repo/ShowRepo.jsx';
import NewRepoSetup from './componenets/repo/NewRepoSetup.jsx';

export default function ProjectRoutes(){
  const { currUser, setCurrUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    if(userIdFromStorage && !currUser){
      setCurrUser(userIdFromStorage);
    }

    if(!userIdFromStorage && !['/login','/signup'].includes(window.location.pathname)){
      navigate('/login');
    }

    if(userIdFromStorage && window.location.pathname == '/login'){
      navigate('/');
    }
  },[currUser, navigate, setCurrUser]);

  let element = useRoutes([
    {
      path: '/',
      element: <Dashboard/>
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/signup',
      element: <Signup/>
    },
    {
      path: '/profile',
      element: <Profile/>
    },
    {
      path: '/repo/create',
      element: <CreateRepo/>
    },
    {
      path: '/repo/:repoId',
      element: <ShowRepo/>
    },
    {
      path: '/:userId/:title',
      element: <NewRepoSetup/>
    }
  ]);

  return element;
};