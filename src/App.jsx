import './styles/globalstyles.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import HomePage from './pages/homepage';
import NotFoundPage from './pages/notfoundpage';

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
        index: 'login',
        // element: <HomePage/>
      },
      {
        index: 'signin',
        // element: <HomePage/>
      },
      {
        //파트너드 찾기
        index: 'find',
        // element: <HomePage/>
      },
      {
        index: 'collaboration',
        // element: <HomePage/>
      },
      {
        index: 'project',
        // element: <HomePage/>
      },
      {
        index: 'community',
        // element: <HomePage/>
      },
      {
        index: 'mypage',
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
