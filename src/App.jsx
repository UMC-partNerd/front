import './styles/globalstyles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import HomePage from './pages/homepage';
import NotFoundPage from './pages/notfoundpage';
import { TeamPage } from './pages/TeamPage'; 
import CollaborationDetailPage from './pages/CollaborationDetailPage'; 
import TeamRegistration from './pages/TeamRegistration';
import LoginPage from './pages/loginpage';
import SignUpPage from './pages/signuppage';
import SignUpSocialPage from './pages/signupsocial';
import SignUpSocialPage from './pages/signupsocial';
import MyPageDe from './pages/mypages/mypage-default';
import MyPagePersonal from './pages/mypages/mypage-personal';
import MyPageTeams from './pages/mypages/mypage-teams';
import MyPagePosts from './pages/mypages/mypage-mypost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'find',
        children: [
          {
            path: ':clubId',
            element: <TeamPage />,
          },
          {
            path: 'team-registration', 
            element: <TeamRegistration />,
          },
        ],
      },
      {
        path: 'collaboration/:id', 
        element: <CollaborationDetailPage />
      },
      {
        // 로그인
        path: 'login',
        element: <LoginPage />
      },
      {
        // 회원가입
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
        path: 'collaboration',
        // element: <HomePage/>
      },
      {
        path: 'project',
        // element: <ProjectPage />
      },
      {
        path: 'community',
        // element: <CommunityPage />
      },
      {
        path: 'mypage',
        children: [
          {
            path:'profile', //디폴트는 내 페이지 
            element: <MyPageDe/>,
          },
          {
            path:'personal-page',
            element: <MyPagePersonal />
          },
          {
            path:'teams',
            element: <MyPageTeams />
          },
          {
            path:'my-posts',
            element: <MyPagePosts />
          }
        ]
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
