import React from 'react';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import Creat from './components/CreatTask.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/Creat',
    element: <Creat />,
  },
])


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>,
)
