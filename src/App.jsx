import './styles/globalstyles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import HomePage from './pages/homepage';
import NotFoundPage from './pages/notfoundpage';
import { TeamPage } from './pages/TeamPage'; 
import CollaborationDetailPage from './pages/CollaborationDetailPage'; 

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
        // element: <FindPage />
      },
      {
        path: 'find/:clubId',
        element: <TeamPage /> 
      },
      {
        path: 'collaboration/:id', 
        element: <CollaborationDetailPage />
      },
      {
        path: 'login',
        // element: <LoginPage />
      },
      {
        path: 'signin',
        // element: <SignInPage />
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
        // element: <MyPage />
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

export default App;
