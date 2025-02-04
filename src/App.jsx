import './styles/globalstyles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import HomePage from './pages/homepage';
import NotFoundPage from './pages/notfoundpage';
import { TeamPage } from './pages/TeamPage'; 
import CollaborationDetailPage from './pages/collaboration-pages/CollaborationDetailPage';
import CollabRegistration from './pages/collaboration-pages/CollabRegistration'; 
import TeamRegistration from './pages/TeamRegistration';
import LoginPage from './pages/loginpage';
import SignUpPage from './pages/signuppage';
import SignUpSocialPage from './pages/signupsocial';
import MyPageDe from './pages/mypages/mypage-default';
import MyPagePersonal from './pages/mypages/mypage-personal';
import MyPageTeams from './pages/mypages/mypage-teams';
import MyPagePosts from './pages/mypages/mypage-mypost';
import CommunityPage from './pages/Communitypage';
import PartnerSearch from './components/partnerd-search';
import ProjectRecruitment from './components/project-recruitment';
import ProjectCollaboration from './components/project-collaboration';
import ProjectPromotion from './components/project-promotion';
import ProjectRecruitDetail from './pages/project-pages/ProjectRecruitDetail'; 
import ProjectPromoteDetail from './pages/project-pages/ProjectPromoteDetail';
import TeamMangement from './pages/TeamMangement'  
import Community from './components/community/Top10-rank';
import KakaoCallback from './components/login/KakaoCallback';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'find',
        children: [
          {
            path: ':clubId',
            element: <TeamPage />, 
          },
          {
            path: ':clubId/manage',  
            element: <TeamMangement/>,  
          },
          {
            path: 'team-registration',
            element: <TeamRegistration />,
          },
          {
            index: true,
            element: <PartnerSearch />,
          },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'oauth/kakao/callback',
        element: <KakaoCallback />,
      },
      {
        path: 'register',
        children: [
          {
            path: 'email',
            element: <SignUpPage />,
          },
          {
            path: 'social',
            element: <SignUpSocialPage />,
          },
        ],
      },
      {
        path: 'collaboration',
        children: [
          {
            path: ':id',
            element: <CollaborationDetailPage />,
          },
          {
            path: 'collab-registration',
            element: <CollabRegistration />,
          },
          {
            index: true,
            element: <ProjectCollaboration />,
          },
        ],
      },
      {
        path: 'project',
        children: [
          {
            path: 'recruit',
            element: <ProjectRecruitment />,
          },
          {
            path: 'promote',
            element: <ProjectPromotion />,
          },
          {
            path: 'recruit/:id',
            element: <ProjectRecruitDetail />, 
          },
          {
            path: 'promote/:id',
            element: <ProjectPromoteDetail />,
          },
          {
            index: true,
            element: <ProjectRecruitment />,
          },
        ],
      },
      {
        path: 'community',
        element: <CommunityPage />
      },
      { //마이페이지 경로 
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
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;