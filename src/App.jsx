import './styles/globalstyles.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import HomePage from './pages/homepage';
import NotFoundPage from './pages/notfoundpage';

import LoginPage from './pages/loginpage';
import SignUpPage from './pages/signuppage';
import SignUpSocialPage from './pages/signupsocial';

import React from 'react';
import PartnerSearch from './components/partnerd-search';
import ProjectRecruitment from './components/project-recruitment';
import ProjectCollaboration from './components/project-collaboration';
import ProjectPromotion from './components/project-promotion';
import Community from './components/community/Top10-rank';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: 'login',
        element: <LoginPage/>
      },
      {
        path: 'register',
        children: [
          {
            path: 'email',
            element: <SignUpPage/>
          },
          {
            path: 'social',
            element: <SignUpSocialPage/>
          }
        ]
      },
      {
        //파트너드 찾기
        path: 'find',
        element: <PartnerSearch/>
      },
      {
        path: 'collaboration',
        element: <ProjectCollaboration/>
      },
      {
        path: 'project',
        children: [
          {
            path: 'recruit',
            element: <ProjectRecruitment/>
          },
          {
            path: 'promote',
            element: <ProjectPromotion/>
          },
          {
            index: true,
            element: <ProjectRecruitment/>
          }
        ]
      },
      {
        path: 'community',
        element: <Community/>
      },
      {
        path: 'mypage',
        // element: <HomePage/>
      },
      {
        path: '*', // 404 에러를 처리하는 와일드카드 경로
        element: <NotFoundPage /> // 404 페이지
      }
      //아래에 추가해주세요.
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App