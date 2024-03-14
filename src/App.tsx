
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import HomePage from './pages/LandingPage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';

import Root from './pages/RootPage';
import StatusPage from './pages/StatusPage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<HomePage />} />
        <Route
          path='/status' 
          element= {
            < StatusPage />
          }
        />
        <Route element={<Root />}>
          <Route
            path='/menu'
            element= {
              <MenuPage />
            }
          />
          <Route
            path='/about'
            element= {
              <AboutPage />
            }
          />
          <Route
            path='/profile'
            element= {
              <ProfilePage />
            }
          />
        </Route>
      </Route>
    )
  )
  return (

    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
