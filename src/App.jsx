import './styles/globalstyles.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import HomePage from './pages/homepage';
import NotFoundPage from './pages/notfoundpage';
import LoginPage from './pages/loginpage';
import SignUpPage from './pages/signuppage';
import SignUpSocialPage from './pages/signupsocial';

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
        // element: <HomePage/>
      },
      {
        path: 'collaboration',
        // element: <HomePage/>
      },
      {
        path: 'project',
        // element: <HomePage/>
      },
      {
        path: 'community',
        // element: <HomePage/>
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
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
