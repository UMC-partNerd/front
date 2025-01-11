import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import HomePage from './pages/homepage';

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
        path: '*', 
        element: <div>페이지를 찾을 수 없습니다.</div> 
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
