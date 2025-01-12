import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TaskDetailsPage from "./pages/task-details.jsx"
import { Toaster } from 'sonner'

const router = createBrowserRouter([
  {
    path: "/", element: <App />
  },
  {
    path: "/task/:taskId", element: <TaskDetailsPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster richColors />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
