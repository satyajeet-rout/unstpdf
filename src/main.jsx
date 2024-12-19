import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';

import Layout from './Pages/Layout';
import PDFUploaderPage from './Pages/Pdfupload';





const App = () => {
  // Define the Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route
            path="/new-workflow"
            element={
              
                <PDFUploaderPage />
             
            }
          />
         
          
        </Route>
        
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

// Render the App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
