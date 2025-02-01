import './styles/globalstyles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import HomePage from './pages/homepage';
import NotFoundPage from './pages/notfoundpage';
import { TeamPage } from './pages/TeamPage'; 
import CollaborationDetailPage from './pages/collaboration-pages/CollaborationDetailPage'; 
import TeamRegistration from './pages/TeamRegistration';
import LoginPage from './pages/loginpage';
<<<<<<< HEAD
=======
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
import Community from './components/community/Top10-rank';
import KakaoCallback from './components/login/KakaoCallback';

>>>>>>> d5766451815f519c6166c822b35e4ad219eb80e9

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
          {
            index: true,
            element: <PartnerSearch />
          }
        ],
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'oauth/kakao/callback',
        element: <KakaoCallback />
      },
      {
        path: 'signin',
        // element: <HomePage/>
      },
      {
        path: 'collaboration',

        children: [
          {
            path: ':id', 
            element: <CollaborationDetailPage />,
          },
        ],

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
        element: <CommunityPage />
      },
      {
        path: 'mypage',
<<<<<<< HEAD
        // element: <HomePage/>
=======
        children: [
          {
            path:'profile', //디폴트는 내 페이지 
            //element: <MyPageDe/>,
          },
          {
            path:'personal-page',
            //element: <MyPagePersonal />
          },
          {
            path:'teams',
            //element: <MyPageTeams />
          },
          {
            path:'my-posts',
            //element: <MyPagePosts />
          }
        ]
>>>>>>> d5766451815f519c6166c822b35e4ad219eb80e9
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
])



function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
