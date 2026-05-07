import { createHashRouter, Navigate } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import Category from './routes/Category';
import Routine from './routes/Routine';
import Emotions from './routes/Emotions';
import Calm from './routes/Calm';
import Stories from './routes/Stories';
import Favorites from './routes/Favorites';
import Settings from './routes/Settings';
import Profile from './routes/Profile';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'category/:id', element: <Category /> },
      { path: 'routines', element: <Routine /> },
      { path: 'emotions', element: <Emotions /> },
      { path: 'calm', element: <Calm /> },
      { path: 'stories', element: <Stories /> },
      { path: 'favorites', element: <Favorites /> },
      { path: 'settings', element: <Settings /> },
      { path: 'profile', element: <Profile /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
