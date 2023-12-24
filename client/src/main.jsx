import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import './index.css'

import App from './App.jsx';
import RedirectPage from './pages/redirect-page';
import ErrorPage from './pages/error-page';
import NotFound from './pages/not-found';


const router = createBrowserRouter([
    {
        path: '/:urlCode',
        element: <RedirectPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/',
        exact: true,
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: '*',
        element: <NotFound />,
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
